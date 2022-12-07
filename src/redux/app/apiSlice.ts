import {
    BaseQueryApi,
    createApi,
    FetchArgs,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {logout, setCredentials} from '../slices/authSlice';
import {RootState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.10.25.200:3000';

const baseQuery = fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    prepareHeaders: (
        headers: Headers,
        {
            getState,
        }: Pick<
            BaseQueryApi,
            'getState' | 'extra' | 'endpoint' | 'type' | 'forced'
        >,
    ) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('x-access-token', `${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;
    },
    credentials: 'include',
});

const baseQueryWithReAuth = async (args: string | FetchArgs, api: any , extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        console.log("Refresh token call")
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if(!refreshToken) return api.dispatch(logout())
        // send refresh token to get new access token
        const refreshTokenResult = await fetch(`${API_URL}/api/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken,
            }),
        })
            .then(response => {
                return response.json();
            })
            .catch(() => {
                api.dispatch(logout());
            });

        if (refreshTokenResult?.token) {
            const {token} = refreshTokenResult;
            const email = api.getState().auth.email;

            //store new token
            api.dispatch(setCredentials({token, refreshToken, email}));

            //retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        }else {
            api.dispatch(logout());
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: builder => ({}),
});


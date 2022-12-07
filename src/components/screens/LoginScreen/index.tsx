import {View} from 'react-native';
import React from 'react';
import AuthContent, {AUTH} from '../../templates/AuthContent';
import {useAppDispatch} from '../../../hooks/reduxHooks';
import LoadingOverlay from '../../atoms/LoadingOverlay';
import {useLoginMutation} from '../../../redux/slices/authApiSlice';
import {setCredentials} from '../../../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    // The `state` arg is correctly typed as `RootState` already
    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useAppDispatch();

    const onAuthenticate = async ({email, password}: AUTH) => {
        try {
            // const userData = await fetch(`http://10.10.25.200:3000/api/login`, {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         email,
            //         password
            //     }),
            // })
            //     .then(async (response) => {
            //         // console.log("response",  response.clone().json())
            //         // const result = await response.json();
            //         return response.json()
            //     })
            //     .catch((err: any) => {
            //         console.log("err",err)
            //     });
            const userData = await login({email, password}).unwrap();
            console.log("userData",userData)
            
            await dispatch(setCredentials({...userData}));
            await AsyncStorage.setItem('token', userData.token);
            await AsyncStorage.setItem(
                'refreshToken',
                userData.refreshToken,
            );
        } catch (error: any) {
            console.log('error', error);
            if (!error.response) {
                console.log('No server Response');
            } else if (error.originalStatus === 400) {
                console.log('Missing email or password');
            } else if (error.originalStatus === 401) {
                console.log('Unauthorized');
            } else {
                console.log('Login Failed', error);
            }
        }
    };

    if (isLoading) {
        return <LoadingOverlay message="Loading ..." />;
    }
    return (
        <View>
            <AuthContent isLogin={true} onAuthenticate={onAuthenticate} />
        </View>
    );
};

export default LoginScreen;

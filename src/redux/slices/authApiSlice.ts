import { apiSlice } from "../app/apiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/login",
                method: "POST",
                body: {...credentials}
            }),
            // transformResponse: (response) => response.json(),
            // transformErrorResponse: (error) => error  
        }),
    }),
    // overrideExisting: false,
})

export const { useLoginMutation } = authApiSlice
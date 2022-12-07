import { apiSlice } from "../app/apiSlice";


export const dataApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getData: builder.mutation({
            query: () => ({
                url: "/secure",
                method: "GET",
                // body: {...credentials}
            }),
        }),
    })
})

export const { useGetDataMutation } = dataApiSlice
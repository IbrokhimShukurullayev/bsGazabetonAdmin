import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: "https://667fad8af2cb59c38dc978a7.mockapi.io/products",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token")
        if (token) {
            headers.set('authentication', `${token}`)
        }
        return headers
    },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
    reducerPath: 'mainApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ["Product", "Category", "User"],
    endpoints: () => ({}),
})
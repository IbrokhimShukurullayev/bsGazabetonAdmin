import { api } from './api'

export const categoryApi = api.injectEndpoints({
    endpoints: (build) => ({
        // Get request
        getCategory: build.query({
            query: (params) => ({
                url: '/category',
                params
            }),
            providesTags: ["Category"]
        }),
        // Post request
        createCategory: build.mutation({
            query: (body) => ({
                url: "/category",
                method: "POST",
                body
            }),
            invalidatesTags: ["Category"]
        }),
        // Delete request
        deleteCategory: build.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Category"]
        }),
        // Updatet request
        updateCategory: build.mutation({
            query: ({ body, id }) => ({
                url: `/category/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Category"]
        })
    }),
})

export const {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoryQuery,
    useUpdateCategoryMutation,
} = categoryApi
// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
    id: number;
    name: string;
}

type ProductsResponse = Product[];

export const productApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['Products'],
    endpoints: (build) => ({
        getProducts: build.query<ProductsResponse, void>({
            query: () => 'products',
            // Provides a list of `Products` by `id`.
            // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
            providesTags: (result) =>
                result
                    ? // successful query
                    [
                        ...result.map(({ id }) => ({ type: 'Products', id }) as const),
                        { type: 'Products', id: 'LIST' },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Products', id: 'LIST' }` is invalidated
                    [{ type: 'Products', id: 'LIST' }],
        }),
        addProduct: build.mutation<Product, Partial<Product>>({
            query(body) {
                return {
                    url: `product`,
                    method: 'POST',
                    body,
                };
            },
            // Invalidates all Product-type queries providing the `LIST` id - after all, depending on the sort order,
            // that newly created product could show up in any lists.
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),
        getProduct: build.query<Product, number>({
            query: (id) => `product/${id}`,
            providesTags: (result, error, id) => [{ type: 'Products', id }],
        }),
        updateProduct: build.mutation<Product, Partial<Product>>({
            query(data) {
                const { id, ...body } = data;
                return {
                    url: `product/${id}`,
                    method: 'PUT',
                    body,
                };
            },
            // Invalidates all queries that subscribe to this Product `id` only.
            invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
        }),
        deleteProduct: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `product/${id}`,
                    method: 'DELETE',
                };
            },
            // Invalidates all queries that subscribe to this Product `id` only.
            invalidatesTags: (result, error, id) => [{ type: 'Products', id }],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useGetProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;

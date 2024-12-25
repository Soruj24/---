/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useGetProductsQuery } from '@/services/productApi'
import React, { useEffect, useState } from 'react'

const ProductShow = () => {
    const { data, isLoading, isError } = useGetProductsQuery()
    const [products, setProducts] = useState<any[]>([])

    useEffect(() => {
        if (data) {
            setProducts(data)  // ডেটা সেট করা
        }
    }, [data])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error loading products</div>
    }

    return (
        <div>
            <h1>Product Show</h1>
            <ul>
                {products.map((product: any) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default ProductShow

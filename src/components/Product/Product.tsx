'use client'
import { ProductType } from '@/utils/allModelTypes';
import Image from 'next/image';
import React, { useMemo } from 'react'
import "./_product.scss";
import { useRouter } from 'next/navigation';

type Props = {
    product: ProductType;
}

function Product({ product }: Props) {
    const productDescription = useMemo(()=>{
        const description = (product?.description?.length !== undefined) && (product?.description?.length < 120) ? product?.description : product?.description?.slice(0, 120) + "..."
        return description
    }, []);

    const router = useRouter();

    return (
        <main className='product_main_container flex_column' onClick={()=>{router.push(`/product/${product.id}`)}}>
            <img className='product_image' src={product?.images ? product?.images[0]?.imageUrl : ""} alt={product?.name}/>
            <p className='product_name'>{product?.name}</p>
            <p className='product_description'>{productDescription}</p>
            <p className='product_price'>£{(parseFloat(product?.basePrice.toString())).toFixed(2)}</p>
        </main>
    )
}

export default Product

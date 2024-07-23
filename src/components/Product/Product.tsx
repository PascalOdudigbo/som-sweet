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
    const productDescription = useMemo(() => {
        const description = (product?.description?.length !== undefined) && (product?.description?.length < 80) ? product?.description : product?.description?.slice(0, 100) + "..."
        return description
    }, [product?.description]);

    const router = useRouter();

    return (
        <div className='product_main_container' onClick={() => { router.push(`/product/${product.id}`) }}>
            <Image
                className='product_image'
                src={product?.images ? product?.images[0]?.imageUrl : ""}
                alt={product?.name}
                width={400}
                height={225}
                // layout="responsive"
            />
            <div className='product_content'>
                <h3 className='product_name'>{product?.name}</h3>
                <p className='product_description'>{productDescription}</p>
                <p className='product_price'>£{(parseFloat(product?.basePrice.toString())).toFixed(2)}</p>
            </div>
        </div>
    )
}

export default Product
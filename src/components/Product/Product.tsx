import { ProductType } from '@/app/utils/allModelTypes';
import Image from 'next/image';
import React from 'react'
import "./_product.scss";
type Props = {
    product: ProductType;
}
function Product({ product }: Props) {
    return (
        <main className='product_main_container flex_column'>
            <img className='product_image' src={product?.images ? product?.images[0]?.imageUrl : ""} alt={product?.name}/>
            <p className='product_name'>{product?.name}</p>
            <p className='product_description'>{product?.description}</p>
            <p className='product_price'>£{(parseFloat(product?.basePrice.toString())).toFixed(2)}</p>
        </main>
    )
}

export default Product

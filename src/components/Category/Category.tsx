import { CategoryType } from '@/utils/allModelTypes'
import React from 'react'
import "./_category.scss"
import Image from 'next/image';

type Props = {
    category: CategoryType;
    onClick: (term: number) => void
}

function Category({category, onClick}: Props) {
  return (
    <main className='category_main_container flex_column_center' onClick={()=>{onClick(category.id)}}>
        <Image className='category_image' src={category?.image} alt={category?.name} width={120} height={120}/>
        <h1 className='category_name'>{category?.name}</h1>
    </main>
  )
}

export default Category

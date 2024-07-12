import { CategoryType } from '@/app/utils/allModelTypes'
import React from 'react'
import "./_category.scss"

type Props = {
    category: CategoryType;
}
function Category({category}: Props) {
  return (
    <main className='category_main_container flex_column_center'>
        <img className='category_image' src={category?.image} alt={category?.name}/>
        <h1 className='category_name'>{category?.name}</h1>
    </main>
  )
}

export default Category

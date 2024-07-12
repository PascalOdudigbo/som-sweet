'use client'
import { NavChildFooterLayout, Product } from '@/components'
import React, { useEffect, useState } from 'react'
import { discountPhoto } from '@/assets'
import Image from 'next/image'
import "./_store.scss"
import { CategoryType, OfferType, ProductType } from '../utils/allModelTypes'
import { testCategories, testOffers, testProducts } from '../utils/allTestData'
import Category from '@/components/Category/Category'
import { filterIcon } from '@/assets'

function Store() {
  const [offers, setOffers] = useState<OfferType[]>(testOffers)
  const [targetOffer, setTargetOffer] = useState<OfferType>(offers[0])
  const [categories, setCategories] = useState<CategoryType[]>(testCategories)
  const [products, setProducts] = useState<ProductType[]>(testProducts)

  const [viewAllCategories, setViewAllCategories] = useState<boolean>(false)


  useEffect(() => {
    const intervalId = setInterval(() => {
      setTargetOffer(targetOffer => {
        const currentIndex = offers.indexOf(targetOffer);
        const nextIndex = (currentIndex + 1) % offers.length;
        return offers[nextIndex];
      });
    }, 6000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);


  return (
    <NavChildFooterLayout>
      <main className='shop_main_container page_container flex_column_center'>

        <section className='shop_offers_container flex_column'>
          <h1 className='section_title'>OFFERS</h1>

          <div className='image_title_button_container flex_column_center'>
            <h1 className='offer_name playfair_shadow_title'>{targetOffer.name}</h1>
            <img className='offer_image' src={targetOffer.image} alt={targetOffer.name} title={targetOffer.description} />
            <button className='shop_offers_button border_button'>SHOP NOW</button>
          </div>
        </section>


        <section className='shop_categories_container flex_column_center'>
          <div className='section_title_button_container flex_row_center'>
            <h1 className='section_title'>CATEGORIES</h1>
            <button className='shop_categories_button border_button_void'
              onClick={() => {
                setViewAllCategories(prev => !prev)
              }}>{!viewAllCategories ? "VIEW ALL" : "MINIMIZE"}</button>
          </div>

          <div className='categories_container'>
            {
              categories.map(category => {
                if (!viewAllCategories) {
                  return categories.indexOf(category) < 4 && <Category key={category.id} category={category} />
                }
                else {
                  return <Category key={category.id} category={category} />
                }
              })
            }
          </div>
        </section>

        <section className='shop_products_container flex_column_center'>
          <div className='section_title_dropdown_container flex_row_center'>
            <h1 className='section_title'>EXPLORE OUR TASTY TREATS</h1>
            <Image className='filter_icon' src={filterIcon} alt='filter icon' title='Filter' />
          </div>

          <div className='products_container'>
            {
              products.map(product =>
                <Product key={product.id} product={product} />
              )
            }
          </div>

        </section>

      </main>
    </NavChildFooterLayout>

  )
}

export default Store

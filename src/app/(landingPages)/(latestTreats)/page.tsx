import React from 'react'
import "./_latestTreats.scss"
import { testProducts } from '@/app/utils/allTestData';
import { Product } from '@/components';

function LatestTreats() {
    return (
        <main className='latestTreats_main_container page_container flex_column_center'>
            <p className='latestTreats_page_title'>OUR LATEST TREATS</p>
            <p className='latestTreats_page_text'>Follow us on your preferred social media platform for the latest updates, behind-the-scenes content, and more sweet delights.</p>

            <section className='products_container flex_row'>
                {
                    testProducts.map(product => 
                    testProducts.indexOf(product) < 3 &&
                    <Product
                        key={product.id}
                        product={product}
                    />)
                }
            </section>

            <button className='view_all_button border_button'>VIEW ALL TREATS</button>


        </main>
    )
}

export default LatestTreats;

import { Search } from '@/components'
import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <main className='products_table_wrapper'>
            <section className='add_product_link_wrapper'>
                <h2>Products</h2>
                <Link href={"/"} className='custom_button add_product_link'>ADD</Link>
            </section>
            <div className="search_wrapper">
                {
                    <Search/>
                }
            </div>

            <table className="products_table">
                <thead>
                    <tr className="table_headers_wrapper">
                        <th className="p__inter table_header">IMAGE</th>
                        <th className="p__inter table_header">NAME</th>
                        <th className="p__inter table_header">DESCRIPTION</th>
                        <th className="p__inter table_header">BASE PRICE</th>
                        <th className="p__inter table_header">AVAILABLE</th>
                        <th className="p__inter table_header">ACTION</th>
                    </tr>
                </thead>

                <tbody className='table_body'>
                   
                </tbody>
            </table>

            <section className='product_mobile_view'>
                {
                    // menuItems?.map((menuItem) => (
                    //     <MenuItem
                    //         key={menuItem.id}
                    //         menuItem={menuItem}
                    //         setTargetMenuItem={setTargetMenuItem}
                    //         menuItems={menuItems}
                    //         setMenuItems={setMenuItems}
                    //     />
                    // ))
                }
            </section>
            {menuItems?.length < 1 && <h3 className="p__inter no_products_text">NO MENU ITEMS</h3>}

        </main>
    )
}

export default page

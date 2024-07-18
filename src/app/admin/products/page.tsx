'use client'
import React, { useEffect, useState } from 'react'
import { ProductRow, Search } from '@/components'
import Link from 'next/link'
import { ProductType } from '@/utils/allModelTypes';
import "./_products.scss"
import { testProducts } from '@/utils/allTestData';

function Products() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch products from API
        async function fetchProducts() {
            try {
                const response = await fetch('/api/admin/products');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        }

        fetchProducts();
    }, []);

    useEffect(() => {
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <main className='products_wrapper'>
            <section className='add_product_link_wrapper flex_row_center'>
                <h2 className='section_title'>Products</h2>
                <Link href={"/admin/products/add"} className='add_product_link border_button_void'>ADD</Link>
            </section>
            <div className="search_wrapper">
                <Search />
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
                    {testProducts.map((product) => (
                        <ProductRow
                            key={product.id}
                            product={product}
                            setProducts={setProducts}
                        />
                    ))}
                </tbody>
            </table>

            {/* <section className='product_mobile_view'>
                {filteredProducts.map((product) => (
                    <Product
                        key={product.id}
                        product={product}
                        setProducts={setProducts}
                    />
                ))}
            </section> */}
            {filteredProducts.length < 1 && <h3 className="p__inter no_products_text">NO PRODUCTS FOUND</h3>}

        </main>
    )
}

export default Products

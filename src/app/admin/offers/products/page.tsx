'use client'
import React, { useEffect, useState } from 'react'
import { OfferProductsRow, Search } from '@/components'
import Link from 'next/link'
import { CategoryType, ProductType } from '@/utils/allModelTypes';
import "./_offer_products.scss"
import { showToast } from '@/utils/toast'
import { getProductsForDiscount, removeProductFromDiscount } from '@/utils/discountManagement';
import { useParams } from 'next/navigation'

export default function OfferProductsPage() {
    const params = useParams()
    const discountId = parseInt(params.id.toString() || '0', 10)

    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            if (discountId === 0) return;
            try {
                setIsLoading(true);
                const fetchedProducts = await getProductsForDiscount(discountId);
                setProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts);
            } catch (error) {
                console.error('Failed to fetch products:', error);
                showToast('error', 'Failed to load products. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }

        async function fetchCategories() {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }

        fetchProducts();
        fetchCategories();
    }, [discountId]);

    useEffect(() => {
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleRemoveProduct = async (productId: number) => {
        try {
            await removeProductFromDiscount(discountId, productId);
            setProducts(products.filter(product => product.id !== productId));
            showToast('success', 'Product removed from discount successfully.');
        } catch (error) {
            console.error('Failed to remove product:', error);
            showToast('error', 'Failed to remove product. Please try again.');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main className='discount_products_wrapper'>
            <section className='add_product_link_wrapper flex_row_center'>
                <h2 className='section_title'>Offer Products</h2>
                <Link href={`/admin/offers/${discountId}/products/add`} className='add_product_link border_button_void'>ADD PRODUCT</Link>
            </section>

            <div className="search_wrapper">
                <Search onSearch={handleSearch}/>
            </div>

            <table className="products_table">
                <thead>
                    <tr className="table_headers_wrapper">
                        <th className='table_header'>IMAGE</th>
                        <th className="table_header">NAME</th>
                        <th className="table_header">BASE PRICE</th>
                        <th className="table_header">CATEGORY</th>
                        <th className="table_header">ACTION</th>
                    </tr>
                </thead>

                <tbody className='table_body'>
                    {filteredProducts.map((product) => (
                        <OfferProductsRow
                            key={product.id}
                            product={product}
                            categories={categories}
                            onRemove={() => handleRemoveProduct(product.id)}
                        />
                    ))}
                </tbody>
            </table>

            {filteredProducts.length < 1 && <h3 className="p__inter no_products_text">NO PRODUCTS FOUND</h3>}
        </main>
    )
}
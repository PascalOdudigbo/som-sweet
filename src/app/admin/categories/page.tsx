'use client'
import React, { useEffect, useState } from 'react'
import { CategoryRow, Search } from '@/components'
import Link from 'next/link'
import { CategoryType } from '@/utils/allModelTypes';
import "./_categories.scss"
import { testCategories } from '@/utils/allTestData';

function Categories() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<CategoryType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch categories from API
        async function fetchCategories() {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                setCategories(data);
                setFilteredCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }

        fetchCategories();
    }, []);

    useEffect(() => {
        const filtered = categories.filter(category => 
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCategories(filtered);
    }, [searchTerm, categories]);

    
    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <main className='categories_wrapper'>
            <section className='add_category_link_wrapper flex_row_center'>
                <h2 className='section_title'>Categories</h2>
                <Link href={"/admin/categories/add"} className='add_category_link border_button_void'>ADD</Link>
            </section>
            <div className="search_wrapper">
                <Search onSearch={handleSearch}/>
            </div>

            <table className="categories_table">
                <thead>
                    <tr className="table_headers_wrapper">
                        <th className="p__inter table_header">IMAGE</th>
                        <th className="p__inter table_header">NAME</th>
                        <th className="p__inter table_header">PRODUCT COUNT</th>
                        <th className="p__inter table_header">CREATED AT</th>
                        <th className="p__inter table_header">UPDATED AT</th>
                        <th className="p__inter table_header">ACTION</th>
                    </tr>
                </thead>

                <tbody className='table_body'>
                    {filteredCategories.map((category, index) => (
                        <CategoryRow
                            key={category.id}
                            index={index}
                            category={category}
                            setCategories={setCategories}
                        />
                    ))}
                </tbody>
            </table>

            {/* <section className='category_mobile_view'>
                {filteredCategories.map((category) => (
                    <Category
                        key={category.id}
                        category={category}
                        setCategories={setCategories}
                    />
                ))}
            </section> */}
            {filteredCategories.length < 1 && <h3 className="no_categories_text">NO CATEGORIES FOUND</h3>}

        </main>
    )
}

export default Categories
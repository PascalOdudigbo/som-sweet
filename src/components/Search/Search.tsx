import Image from 'next/image'
import React from 'react'
import {searchIcon} from "../../assets"
import "./_search.scss"

function Search() {
  return (
    <div className='search_main_container flex_row_center'>
        <Image src={searchIcon} alt='search' height={20} width={20}/>
        <input className="search_input" type='text' placeholder='Search'/>  
    </div>
  )
}

export default Search

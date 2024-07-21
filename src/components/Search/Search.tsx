import Image from 'next/image'
import React from 'react'
import {searchIcon} from "../../assets"
import "./_search.scss"

function Search({onSearch}:{onSearch: (term: string) => void}) {
  return (
    <div className='search_main_container flex_row_center'>
        <Image className="searchIcon" src={searchIcon} alt='search' height={20} width={20}/>
        <input className="search_input" type='text' placeholder='Search' onChange={e => {onSearch(e.target.value)}}/>  
    </div>
  )
}

export default Search

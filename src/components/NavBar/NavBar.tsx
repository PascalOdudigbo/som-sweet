import React from 'react'
import {Search} from '../'
import "./_navbar.scss"

function NavBar() {
  return (
    <nav className='nav_main_container flex_column_center'>
        <div className='nav_top_sub_container flex_row_center' >
            <h3 className='nav_site_title'>Som' Sweet</h3>
            <Search/>
        </div>
      
    </nav>
  )
}

export default NavBar

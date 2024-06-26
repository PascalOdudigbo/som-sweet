import React from 'react'
import {NavDropdown, Search} from '../'
import "./_navbar.scss"

function NavBar() {
  return (
    <nav className='nav_main_container flex_column_center'>
        <section className='nav_top_sub_container flex_row_center' >
            <h3 className='nav_site_title'>Som' Sweet</h3>
            <Search/>

            <section>
              <NavDropdown/>
            </section>


        </section>
      
    </nav>
  )
}

export default NavBar

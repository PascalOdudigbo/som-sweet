import React from 'react'
import { NavDropdown, Search } from '../'
import "./_navbar.scss"
import Image from 'next/image'
import { cartIcon } from "../../assets";
import Link from 'next/link';


function NavBar() {
  return (
    <nav className='nav_main_container flex_column_center'>
      <section className='nav_top_sub_container flex_row_center' >
        <h3 className='nav_site_title'>Som' Sweet</h3>

        <Search />

        <section className='nav_dropdown_cart_container flex_row_center'>
          <NavDropdown />

          <section className='nav_badge_cart_container flex_column_center'>
            <p className='nav_badge'>{4}</p>
            <Image src={cartIcon} alt='cart icon' height={24} width={24} />
          </section>
        </section>
      </section>

      <section className='nav_bottom_sub_container flex_row_center'>
        <section className='nav_page_links_container flex_row'>
          <Link className='nav_page_link' href="/">HOME</Link>
          <Link className='nav_page_link' href="/store">STORE</Link>
          <Link className='nav_page_link' href="#aboutus">ABOUT US</Link>
          <Link className='nav_page_link' href="/#contactus">CONTACT US</Link>
        </section>

        <section className='nav_socials_container flex_row'>
          <Link className='nav_socials_link' href="/">INSTAGRAM</Link>
          <Link className='nav_socials_link' href="/store">FACEBOOK</Link>
          <Link className='nav_socials_link' href="#aboutus">TIKTOK</Link>
          <Link className='nav_socials_link' href="/#contactus">YOITUBE</Link>
        </section>

      </section>

    </nav>
  )
}

export default NavBar

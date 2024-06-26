import React from 'react'
import "./_footer.scss"
import Link from 'next/link'

function Footer() {
  return (
    <div className='footer_main_container flex_column_center'>
      <section className='footer_sub_container flex_row_center'>
        <section className='opening_hours_container flex_column'>
          <h1 className='footer_section_title playfair_shadow_title'>OPENING HOURS</h1>
          <span className='flex_row_center'><p className='opening_hour'><b>Mon - Fri:</b> 9am - 6pm</p></span>
          <span className='flex_row_center'><p className='opening_hour'><b>Saturday:</b> 9am - 4pm</p></span>
          <span className='flex_row_center'><p className='opening_hour'><b>Sunday:</b> Closed</p></span>
        </section>

        <section className='footer_links_contaner flex_column_center'>
          <Link className='footer_link' href="/store">Store</Link>
          <Link className='footer_link' href="/#aboutus">About Us</Link>
          <Link className='footer_link' href="">Store Policies</Link>
          <Link className='footer_link' href="/contact-us">Contact Us</Link>
        </section>

        <section className='footer_contact_container'>
          <h1 className='footer_section_title playfair_shadow_title'>PHONE</h1>
          <p className='footer_phone'>+44793870248</p>

          <h1 className='footer_section_title playfair_shadow_title'>OUR LOCATION</h1>
          <p className='footer_location'>GL4 5XL, Old Rothman Road, Glasgow</p>
        </section>

      </section>
      <p className='footer_copyright'>Copyright © {new Date().getFullYear()} MakkTek ltd</p>

    </div>
  )
}

export default Footer

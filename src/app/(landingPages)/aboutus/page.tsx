import React from 'react'
import "./_aboutUs.scss"
import { aboutUsImg1, aboutUsImg2 } from '@/assets'
import Image from 'next/image'

function AboutUs() {
  return (
    <main className='aboutus_main_container page_container flex_column_center'>
      <p className='aboutus_page_title'>ABOUT US</p>
      <section className='aboutus_subsection1 flex_row'>
        <Image className='aboutus_img1' src={aboutUsImg1} alt='about us' />

        <section className='top_text_section flex_column'>
          <h1 className='top_text_section_title playfair_shadow_title_black'>OUR PASSION FOR PERFECTION</h1>
          <p className='top_text_section_text'>At our cake store, perfection is more than a goal—it's our passion. Every cake we create is a testament to our dedication to quality and our love for the art of baking. From the finest ingredients to the meticulous techniques we employ, our mission is to deliver exceptional cakes that delight your taste buds and elevate your celebrations.</p>
        </section>
      </section>

      <section className='aboutus_subsection2 flex_row'>
        <section className='bottom_text_section flex_column'>
          <h1 className='bottom_text_section_title playfair_shadow_title_black'>OUR STORY: FROM DREAM TO REALITY</h1>
          <p className='bottom_text_section_text'>Our journey began with a simple dream: to bring joy to people's lives through delicious, beautifully crafted cakes. Founded by [Founder’s Name] in [Year], our cake store has grown from a small kitchen operation to a beloved local bakery. Each cake tells a story of creativity, hard work, and a commitment to making every occasion special. Join us as we continue to bake dreams into reality, one slice at a time.</p>
        </section>
        <Image className='aboutus_img2' src={aboutUsImg2} alt='about us' />

      </section>

    </main>
  )
}

export default AboutUs

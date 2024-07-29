import React from 'react'
import "./_aboutUs.scss"
import { aboutUsImg1, aboutUsImg2 } from '@/assets'
import Image from 'next/image'

function AboutUs() {
  return (
    <main id="aboutus" className='aboutus_main_container'>
      <h2 className='aboutus_page_title'>ABOUT US</h2>
      
      <section className='aboutus_subsection'>
        <Image className='aboutus_img' src={aboutUsImg1} alt='Passionate bakers at work' width={480} height={680} />
        <div className='text_section'>
          <h3 className='text_section_title playfair_shadow_title_black'>OUR PASSION FOR PERFECTION</h3>
          <p className='text_section_text'>{"At our cake store, perfection is more than a goal—it's our passion. Every cake we create is a testament to our dedication to quality and our love for the art of baking. From the finest ingredients to the meticulous techniques we employ, our mission is to deliver exceptional cakes that delight your taste buds and elevate your celebrations."}</p>
        </div>
      </section>

      <section className='aboutus_subsection'>
        <Image className='aboutus_img' src={aboutUsImg2} alt='Our cake shop journey' width={480} height={680} />
        <div className='text_section'>
          <h3 className='text_section_title playfair_shadow_title_black'>OUR STORY: FROM DREAM TO REALITY</h3>
          <p className='text_section_text'>{"Our journey began with a simple dream: to bring joy to people's lives through delicious, beautifully crafted cakes. Founded by [Founder's Name] in [Year], our cake store has grown from a small kitchen operation to a beloved local bakery. Each cake tells a story of creativity, hard work, and a commitment to making every occasion special. Join us as we continue to bake dreams into reality, one slice at a time."}</p>
        </div>
      </section>
    </main>
  )
}

export default AboutUs
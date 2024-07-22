"use client";
import React, { useState, useEffect } from 'react'
import "./_welcome.scss"
import Image from 'next/image'
import { berryBg, breadBg, breadBg2, brownieBg, cakeBg, donutsBg } from '@/assets'

function Welcome() {
  const images = [cakeBg, brownieBg, donutsBg, breadBg];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);


  return (
    <main className='welcome_main_container page_container flex_column_justify_center'>
      <section className='welcome_text_and_image_container flex_row_center'>
        <section className='welcome_text_button_container flex_column'>
          <h1 className='welcome_text kavoon_shadow_title'>Som' Sweet</h1>
          <h2 className='welcome_subtext'>INDULGE IN THE SWEETEST MOMENTS</h2>
          <button className='welcome_shop_button border_button'>PLACE ORDER</button>
        </section>

        <Image className='welcome_image' src={images[currentIndex]} alt='welcome' />
      </section>

    </main>
  )
}

export default Welcome

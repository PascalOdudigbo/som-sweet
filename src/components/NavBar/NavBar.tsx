'use client'
import React, { useEffect, useState } from 'react'
import { NavDropdown, Search } from '../'
import "./_navbar.scss"
import Image from 'next/image'
import { cartIcon } from "../../assets";
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'


// An array of NavLink Objects
const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'STORE', href: '/store' },
  { name: 'ABOUT US', href: '/#aboutus' },
  { name: 'CONTACT US', href: '/#contactus' },
];
// An array of Social media Objects
const socialLinks = [
  { name: 'INSTAGRAM', href: '/' },
  { name: 'FACEBOOK', href: '/store' },
  { name: 'TIKTOK', href: '/#aboutus' },
  { name: 'YOUTUBE', href: '/#contactus' },
];

function NavBar() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    // Update hash when it changes
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    
    // Set initial hash
    setCurrentHash(window.location.hash);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isLinkActive = (href: string) => {
    if (typeof window === 'undefined') return false;  // Server-side check

    if (href === '/') {
      return pathname === href && !currentHash;
    }
    if (href.startsWith('/#')) {
      return currentHash === href.substring(1);
    }
    return pathname?.startsWith(href) || false;
  };



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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'nav_page_link',
                {
                  'active_link': isLinkActive(link.href),
                }
              )}
            >
              {link.name}
            </Link>
          ))}
        </section>

        <section className='nav_socials_container flex_row'>
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'nav_socials_link',
                {
                  'active_link': isLinkActive(link.href),
                }
              )}
            >
              {link.name}
            </Link>
          ))}
        </section>

      </section>

    </nav>
  )
}

export default NavBar

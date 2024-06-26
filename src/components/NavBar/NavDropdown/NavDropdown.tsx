import Image from 'next/image'
import React, { FC } from 'react'
import { profileIcon, upIcon } from "../../../assets";
import "./_navDropdown.scss";
import Link from 'next/link';

// Defining the DropdownItem type
type DropdownItemProps = {
  text: string;
  path: string;
}


function NavDropdown() {

  // Creating a dropdown item subcomponent
  const DropdownItem: FC<DropdownItemProps> = ({ text, path }) => {
    return <Link className='nav_dropdown_item flex_row_center' href={path}>
      {text}
    </Link>
  }

  // Creating a dropdown logout item subcomponent
  const DropdownLogoutItem: FC<DropdownItemProps> = ({ text, path }) => {
    return <Link className='nav_dropdown_logout_item flex_row_center' href={path}>
      {text}
    </Link>
  }

  return (
    <div className='nav_dropdown_main_container flex_column_center'>
      <section className='images_container flex_row_center'>
        <Image src={profileIcon} alt='profile icon' height={24} width={24} />
        <Image className="navArrowImage" src={upIcon} alt='arrow icon' height={24} width={24} />
      </section>

      <section className='nav_content_container flex_column_center'>
        <DropdownItem text="My Orders" path="/" />
        <DropdownItem text="My Addresses" path="/" />
        <DropdownItem text="My Wallet" path="/" />
        <DropdownItem text="My Wishlist" path="/" />
        <DropdownItem text="My Account" path="/" />

        <section className='nav_content_login_container flex_column_center'>
          <DropdownItem text="Login" path="/login" />
          <DropdownLogoutItem text="Log Out" path="/logout" />
        </section>
      </section>

    </div>
  )
}

export default NavDropdown

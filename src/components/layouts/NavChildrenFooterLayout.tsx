import React from 'react'
import {NavBar, Footer} from ".."

function NavChildrenFooterLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <>
        <NavBar/>
        {children}
        <Footer/>
    
    </>
  )
}

export default NavChildrenFooterLayout

'use client'
import React, { Children, useMemo, useState } from 'react'
import { addIcon, minusIcon } from '@/assets'
import Image from 'next/image';
import "./_minimizableLayout.scss"

type MinimizableLayoutProps ={
    title: string;
    isActiveInit: boolean;
    children: any;
}

function MinimizableLayout({title, isActiveInit, children}: MinimizableLayoutProps) {
    // Defining state variables for data management
    const [isActive, setIsActive] = useState<boolean>(isActiveInit)

    // A function to define the alt and title text
    const variableAltAndTitle = useMemo(()=> {
       let alt = isActive ? "minimize" : "maximize"
       return alt
    }, [isActive])
    
    // A function to specify the image to be displayed
    const variableIconImage = useMemo(()=> {
        let alt = isActive ? minusIcon : addIcon
        return alt
     }, [isActive])
    
    // A function to set the class of the layout hidden section
    const childSectionClass = useMemo(()=> {
        let alt = isActive ? "section_child_container active_child_section" : "section_child_container"
        return alt
     }, [isActive])

  return (
    <div className='minimizable_section_container flex_column_center'>
        <section className='layout_title_and_icon_wrapper flex_row_center'>
            <p className='layout_title'>{title}</p>
            <Image className='layout_icon' src={variableIconImage} alt={variableAltAndTitle} title={variableAltAndTitle} onClick={()=> setIsActive(prev => !prev)}/>
        </section>

        <section className={childSectionClass}>
            
            {children}
        </section>
      
    </div>
  )
}

export default MinimizableLayout
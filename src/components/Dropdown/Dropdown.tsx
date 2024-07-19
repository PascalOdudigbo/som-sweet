'use client'
import React, { useState } from 'react'
import { IconContext } from "react-icons";
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import './_dropdown.scss'

type Props = {
    label: string;
    items: string[];
    buttonText: string;
    clickFunction: (item: string | number) => void;
    required?: boolean;
}

function Dropdown({ label, items, buttonText, required, clickFunction }: Props) {
    // state variables to control dropdown items display
    const [itemsDisplay, setItemsDisplay] = useState<boolean>(false);
    // variable to determine the dropdown
    const iconStyles = { color: "black" };

    // Type guard function to check if 'item' is a number
    const isNumber = (item: any): item is number => typeof item === 'number';


    return (
        <div className='dropdown_label_and_dropdown_wrapper'>
            <span className='dropdown_label flex_row_center'>{label} {required && <p className='required_symbol'>*</p>}</span>


            <div className='dropdown_wrapper'>
                <div className='dropdown_button_icons_wrapper flex_row_center' onClick={() => setItemsDisplay(prevItemsDisplay => !prevItemsDisplay)}>
                    <p className="p__inter dropdown_button">{buttonText}</p>
                    <IconContext.Provider value={{ size: "20px", className: "dropdown_arrow_icons" }}>
                        {itemsDisplay ? <AiOutlineUp style={iconStyles} /> : <AiOutlineDown style={iconStyles} />}
                    </IconContext.Provider>
                </div>


                <div className="dropdown_items" style={{ display: itemsDisplay ? "block" : "none" }}>
                    {items?.map((item, index) => (
                        <p key={index} className="p__inter" onClick={() => {
                            clickFunction(isNumber(item) ? item : item)
                            setItemsDisplay(false)
                        }}>
                            {item}
                        </p>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Dropdown;

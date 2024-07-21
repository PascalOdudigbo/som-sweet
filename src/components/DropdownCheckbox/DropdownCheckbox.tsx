'use client'
import React, { useState, useEffect } from 'react'
import { IconContext } from "react-icons";
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import './_dropdownCheckbox.scss'

type Props = {
    label: string;
    items: { id: number; name: string }[];
    buttonText: string;
    selectedItems: number[];
    onChange: (selectedIds: number[]) => void;
    required?: boolean;
}

function DropdownCheckbox({ label, items, buttonText, selectedItems, onChange, required }: Props) {
    const [itemsDisplay, setItemsDisplay] = useState<boolean>(false);
    const [selectedIds, setSelectedIds] = useState<number[]>(selectedItems);
    const iconStyles = { color: "black" };

    useEffect(() => {
        setSelectedIds(selectedItems);
    }, [selectedItems]);

    const handleCheckboxChange = (id: number) => {
        const updatedIds = selectedIds.includes(id)
            ? selectedIds.filter(itemId => itemId !== id)
            : [...selectedIds, id];
        setSelectedIds(updatedIds);
        onChange(updatedIds);
    };

    const getButtonText = () => {
        if (selectedIds.length === 0) return buttonText;
        if (selectedIds.length === 1) return items.find(item => item.id === selectedIds[0])?.name;
        return `${selectedIds.length} items selected`;
    };

    return (
        <div className='dropdown_checkbox_label_and_dropdown_wrapper'>
            <span className='dropdown_checkbox_label flex_row_center'>{label} {required && <p className='required_symbol'>*</p>}</span>

            <div className='dropdown_checkbox_wrapper'>
                <div className='dropdown_checkbox_button_icons_wrapper flex_row_center' onClick={() => setItemsDisplay(prev => !prev)}>
                    <p className="p__inter dropdown_checkbox_button">{getButtonText()}</p>
                    <IconContext.Provider value={{ size: "20px", className: "dropdown_checkbox_arrow_icons" }}>
                        {itemsDisplay ? <AiOutlineUp style={iconStyles} /> : <AiOutlineDown style={iconStyles} />}
                    </IconContext.Provider>
                </div>

                <div className="dropdown_checkbox_items" style={{ display: itemsDisplay ? "block" : "none" }}>
                    {items.map((item) => (
                        <label key={item.id} className="dropdown_checkbox_item">
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                            <span className="p__inter">{item.name}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DropdownCheckbox;
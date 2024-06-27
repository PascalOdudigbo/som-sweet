import React from 'react'

import "./_formInput.scss"

type Props = {
    label: string;
    inputType: string;
    inputValue: string;
    required: boolean;
    readonly: boolean;
    onChangeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

function FormInput({label, inputType, inputValue, required, readonly, onChangeFunction}: Props) {
  return (
    <div className='forminput_wrapper'>
        <span className='forminput_label flex_row_center'>{label} {required && <p className='required_symbol'>*</p>}</span>
        <input className='formInput' type={inputType} required={required} value={inputValue} readOnly={readonly} onChange={onChangeFunction}/>
    </div>
  )
}

export default FormInput

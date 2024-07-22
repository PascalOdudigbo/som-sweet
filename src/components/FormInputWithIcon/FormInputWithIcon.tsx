"use client"
import "./_formInputWithIcon.scss";
import Image, { StaticImageData } from "next/image";


// Defining the props type
type FormInputIconType = {
    label: string;
    required: boolean;
    iconSrc: string | StaticImageData;
    type: string;
    readOnly?: boolean;
    hint?: string;
    autoComplete?: string
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
}

function FormInputWithIcon({ label, required, iconSrc, type, readOnly, hint, autoComplete, value, setValue }: FormInputIconType) {
    // Defining the onChange handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setValue(value);
    };

    return (
        <main className="form_input_wrapper flex_column">
            <div className='forminput_label flex_row_center'>
                <p>{label}</p>
                {required && <p className='required_symbol'>*</p>}
            </div>

            <div className='input_wrapper flex_row_center'>
                <Image
                    className='input_icon'
                    src={iconSrc || ''}
                    alt={`${label} icon`}
                    height={25}
                    width={25}
                />                <input className='input_textbox' type={type} readOnly={readOnly} placeholder={hint} value={value} onChange={handleChange} autoComplete={autoComplete} />
            </div>

        </main>

    )
}

export default FormInputWithIcon

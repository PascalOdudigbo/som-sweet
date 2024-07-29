import React from "react";
import "./_formInput.scss";

// Defining the form input props type
type Props = {
  label: string;
  inputType: string;
  inputValue: string;
  required: boolean;
  readonly: boolean;
  autoComplete?: string;
  onChangeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormInput({
  label,
  inputType,
  inputValue,
  required,
  readonly,
  autoComplete,
  onChangeFunction,
}: Props) {
  return (
    <div className="forminput_wrapper">
      <span className="forminput_label flex_row_center">
        {label} {required && <p className="required_symbol">*</p>}
      </span>
      <input
        className="formInput"
        type={inputType}
        required={required}
        value={inputValue}
        readOnly={readonly}
        onChange={onChangeFunction}
        autoComplete={autoComplete}
      />
    </div>
  );
}

export default FormInput;

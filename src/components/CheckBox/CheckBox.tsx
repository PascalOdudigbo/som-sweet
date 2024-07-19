import React from "react";
import "./_checkbox.scss"

const Checkbox = ({ label, isChecked, onChange }: { label: string; isChecked: boolean | undefined; onChange: React.ChangeEventHandler<HTMLInputElement> }) => {

    return (
        <div className="checkbox_container flex_row_center">
            <label className="checkbox_label">{label}</label>
            <input type="checkbox"
                checked={isChecked}
                onChange={(e) => { onChange(e) }}
            />
        </div>
    );
};
export default Checkbox;
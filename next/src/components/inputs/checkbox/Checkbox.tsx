import { useEffect, useState } from "react";
import { IFormInput } from "../Inputs";
import Icon from "@/components/Icons/Icons";

export interface PropsCheckbox extends IFormInput {
	checked?: boolean;
	onChecked?: (checked: boolean) => void;
}

export default function Checkbox({ id, name, label, className, checked = false, readOnly = false, required, onChange, onChecked } : PropsCheckbox) {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);
	
	return (
		<div className="d-inline-flex align-items-center gap-2">
			<input
				id={id}
				name={name || id}
				type="checkbox"
				className={`form-checkbox ${className || ""}`}
				checked={isChecked}
				readOnly={readOnly}
				required={required}
                onChange={(e) => {
                    setIsChecked(!isChecked);
                    onChecked && onChecked(!isChecked);
					onChange && onChange(e);
                }}
			/>

			<label htmlFor={id} className="form-label form-checkbox--label">
				<Icon name="check"></Icon>
				{label && <span>{label}</span>}
			</label>
		</div>
	);
}
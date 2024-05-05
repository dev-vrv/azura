import "./Input.scss";
import { FaCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";

interface IField {
	id: string;
	name?: string;
	label?: string;
	className?: string;
	disabled?: boolean;
	readonly?: boolean;
	required?: boolean;
}

export interface PropsInput extends IField {
	type?: "text" | "password" | "email" | "number";
	placeholder?: string;
	value?: string;
}

export interface PropsCheckbox extends IField {
	checked?: boolean;
	onChecked?: (checked: boolean) => void;
}

function Input(props: PropsInput) {
	const { 
		id, 
		name, 
		type = "text", 
		value = "", 
		disabled = false, 
		placeholder, 
		label, 
		className, 
		required,
	} = props;
	return (
		<div className={`form-group ${disabled && "disabled"}`}>
			{label && (
				<label htmlFor={id} className="form-label">
					{label}
				</label>
			)}
			<input
				id={id}
				name={name || id}
				type={type}
				className={`form-input ${className || ""}`}
				placeholder={placeholder || ""}
				defaultValue={value}
				disabled={disabled}
				required={required}
			/>
		</div>
	);
}

function Checkbox(props: PropsCheckbox) {
    const { id, name, label, className, checked = false, disabled = false, required } = props;
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
				disabled={disabled}
				required={required}
                onChange={() => {
                    setIsChecked(!isChecked);
                    props.onChecked && props.onChecked(!isChecked);
                }}
			/>

			<label htmlFor={id} className="form-label form-checkbox--label">
				<i className="icon-checkbox">
					<FaCheck />
				</i>

				{label && <span>{label}</span>}
			</label>
		</div>
	);
}

export { Input, Checkbox };

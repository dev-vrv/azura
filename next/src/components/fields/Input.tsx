import "./Input.scss";
import { FaCheck } from "react-icons/fa6";


interface IField {
	id: string;
	name?: string;
	label?: string;
	className?: string;
	disabled?: boolean;
	readonly?: boolean;
	required?: boolean;
}

interface InputProps extends IField {
	type?: "text" | "password" | "email" | "number";
	placeholder?: string;
	value?: string;
}

interface CheckboxProps extends IField {
	checked?: boolean;
}

function Input(props: InputProps) {
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

function Checkbox(props: CheckboxProps) {
	const { id, name, label, className, checked = false, disabled = false, required } = props;
	return (
		<div className="d-inline-flex align-items-center gap-2">
			<input
				id={id}
				name={name || id}
				type="checkbox"
				className={`form-checkbox ${className || ""}`}
				defaultChecked={checked}
				disabled={disabled}
				required={required}
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

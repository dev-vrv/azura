import { IField } from "../Inputs";
import Icon from "@/components/Icons/Icons";

export interface PropsInput extends IField {
	type?: "text" | "password" | "email" | "number";
	placeholder?: string;
	value?: string;
}

export default function Input(props: PropsInput) {
	const { 
		id, 
		name, 
		type = "text", 
		value = "", 
		readOnly = false, 
		placeholder, 
		label, 
		className, 
		required,
	} = props;
	return (
		<div className={`form-group ${readOnly? 'disabled' : ''}`}>
			{label && (
				<label htmlFor={id} className="form-input--label">
					{label}
				</label>
			)}
			<input
				id={id}
				name={name || id}
				type={type}
				className={`form-input ${className || ""} ${readOnly? 'disabled' : ''}`}
				placeholder={placeholder || ""}
				defaultValue={value}
				readOnly={readOnly}
				required={required}
			/>
			{readOnly && (
				<Icon name="lock" size="md" color="dark" className="form-input--icon" />
			)}
		</div>
	);
}

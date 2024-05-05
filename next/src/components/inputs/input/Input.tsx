import { PropsInput } from "../Inputs";

export default function Input(props: PropsInput) {
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
				<label htmlFor={id} className="form-input--label">
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

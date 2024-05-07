import { IFormInput } from "../Inputs";
import Icon from "@/components/Icons/Icons";

export interface PropsInput extends IFormInput {
	type?: "text" | "password" | "email" | "number" | "tel";
	placeholder?: string;
	value?: string;
}

export default function Input({
	id,
	name,
	type = "text",
	value = "",
	readOnly = false,
	placeholder,
	label,
	className,
	required,
	onChange,
}: PropsInput) {
	return (
		<div className={`form-group ${readOnly ? "disabled" : ""}`}>
			{label && (
				<label htmlFor={id} className="form-input--label">
					{label}
				</label>
			)}
			<input
				id={id}
				name={name || id}
				type={type}
				className={`form-input ${className || ""} ${readOnly ? "disabled" : ""}`}
				placeholder={placeholder || ""}
				defaultValue={value as string}
				readOnly={readOnly}
				required={required}
				onChange={onChange}
			/>
			{readOnly && <Icon name="lock" size="md" color="dark" className="form-input--icon" />}
		</div>
	);
}

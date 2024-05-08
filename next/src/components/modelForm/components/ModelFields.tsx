import { Checkbox, Input, InputDateTime, InputDate, InputSelect } from "@/components/inputs/Inputs";

interface PropsField {
	id: string;
	type: string;
	value?: string | boolean;
	options?: string[];
	required?: boolean;
	readOnly?: boolean;
	handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MField({ type, id, value, required, readOnly, handleChange, options }: PropsField) {
	const label_display = id.replace("_", " ");
	const inputs = {
		text: 'text',
		email: 'email',
		password: 'password',
		number: 'number',
		tel: 'tel',
		checkbox: 'checkbox',
		datetime: 'datetime',
		date: 'date',
		select: 'select'
	}
	if (type === "text" || type === "email" || type === "password" || type === "number" || type === 'tel') {
		return (
			<Input
				id={id}
				type={type}
				value={value as string}
				required={required}
				label={label_display}
				readOnly={readOnly}
				onChange={handleChange && handleChange}
			/>
		);
	} else if (type === "checkbox") {
		return (
			<Checkbox
				id={id}
				label={label_display}
				checked={value as boolean}
				required={required}
				readOnly={readOnly}
				onChange={handleChange && handleChange}
			/>
		);
	} else if (type === "datetime") {
		return (
			<InputDateTime
				id={id}
				value={value as string}
				required={required}
				readOnly={readOnly}
				label={label_display}
				onChange={handleChange && handleChange}
			/>
		);
	} else if (type === "date") {
		return (
			<InputDate id={id} value={value as string} required={required} readOnly={readOnly} label={label_display} />
		);
	} else if (type === "select") {
		return (
			<InputSelect
				id={id}
				required={required}
				readOnly={readOnly}
				label={label_display}
				value={value as string}
				options={options as string[]}
				onChange={handleChange && handleChange}
			/>
		);
	}
}

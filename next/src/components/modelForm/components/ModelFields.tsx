import { Checkbox, Input, InputDateTime, InputDate } from "@/components/inputs/Inputs";

interface PropsField {
	id: string;
	type: string;
	value?: string | boolean;
	required?: boolean;
	readOnly?: boolean;
}

export default function MField({type, id, value, required, readOnly}: PropsField ) {
	const label_display = id.replace('_', ' '); 
	if (type === 'text' || type === 'email' || type === 'password' || type === 'number') {
		return (
			<Input 
				id={id}
				type={type}
				value={value as string}
				required={required}
				label={label_display}
				readOnly={readOnly}
			/>
		);
	}
	else if (type === 'checkbox') {
		return (
			<Checkbox 
				id={id}
				label={label_display}
				checked={value as boolean}
				required={required}
				readOnly={readOnly}
			/>
		);
	}
	else if (type === 'datetime') {
		return (
			<InputDateTime 
				id={id}
				value={value as string}
				required={required}
				readOnly={readOnly}
				label={label_display}
			/>
		)
	}
	else if (type === 'date') {
		console.log(value);
		return (
			<InputDate 
				id={id}
				value={value as string}
				required={required}
				readOnly={readOnly}
				label={label_display}
			/>
		)
	}
}
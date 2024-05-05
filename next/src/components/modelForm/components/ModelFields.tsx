import { Checkbox, Input } from "@/components/inputs/Inputs";

interface PropsField {
	id: string;
	type: string;
	value?: string | boolean;
	required?: boolean;
	disabled?: boolean;
}



export default function MField({type, id, value, required, disabled}: PropsField ) {
	const label_display = id.replace('_', ' '); 
	if (type === 'text' || type === 'email' || type === 'password' || type === 'number') {
		return (
			<Input 
				id={id}
				type={type}
				value={value as string}
				required={required}
				label={label_display}
				disabled={disabled}
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
				disabled={disabled}
			/>
		);
	}
	else if (type === 'datetime') {
		return (
			'datetime'
		)
	}
}
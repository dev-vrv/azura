import './Input.scss';
import { FaCheck } from "react-icons/fa6";

interface InputProps {
	id: string;
	name?: string;
	type?: "text" | "password" | "email" | "number";
	label?: string;
	placeholder?: string;
	className?: string;
}

interface CheckboxProps {
	id: string;
	name?: string;
	label?: string;
	className?: string;
}

function Input({ id, name, placeholder, label, className, type = "text" }: InputProps) {
	return (
		<div className='d-flex flex-column gap-2'>  
            {label && <label htmlFor={id} className='form-label'>{label}</label>}
			<input
				id={id}
				name={name || id}
				type={type}
				className={`form-input ${className || ""}`}
				placeholder={placeholder || ""}
			/>
		</div>
	);
}


function Checkbox({ id, name, label, className }: CheckboxProps	) {
	return (
		<div className='d-inline-flex align-items-center gap-2'> 
			<input
				id={id}
				name={name || id}
				type='checkbox'
				className={`form-checkbox ${className || ""}`}
			/>

			<label htmlFor={id} className='form-label form-checkbox--label'>
				<i className='icon-checkbox'>
					<FaCheck />
				</i>

				{label && <span>{label}</span>}
			</label>
		</div>
	);
}


export { Input, Checkbox }
import { useEffect, useState } from "react";
import { PropsCheckbox } from "../Inputs";
import Icon from "@/components/Icons/Icons";

export default function Checkbox(props: PropsCheckbox) {
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
				<Icon name="check"></Icon>
				{label && <span>{label}</span>}
			</label>
		</div>
	);
}
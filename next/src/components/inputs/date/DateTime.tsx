
import { IFormInput } from "../Inputs";

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Icon from "@/components/Icons/Icons";

interface PropsDateTime extends IFormInput {
	value?: string;
}


function InputDateTime({ id, name, label, required, value, readOnly }: PropsDateTime) {
	const [date, setDate] = useState(value ? new Date(value) : new Date());
	const [startDate, setStartDate] = useState(date);

	return (
		<div className={`form-group ${readOnly && readOnly}`}>
			{label && (
				<label htmlFor={id} className="form-input--label">
					{label}
				</label>
			)}
			<DatePicker
				icon={<Icon name={readOnly? 'lock' : 'calendar'} size="md" className="text-muted" />}
				showIcon={true}
				selected={startDate}
				onChange={(date) => setStartDate(date as Date)}
				showTimeSelect
				timeFormat="p"
				timeIntervals={15}
				dateFormat="Pp"
				readOnly={readOnly}
				className={`form-input form-input--datetime ${readOnly? 'disabled' : ''}`}
			/>
		</div>
	);

}

function InputDate({ id, name, label, required, value, readOnly }: PropsDateTime) {
	const [date, setDate] = useState(value ? new Date(value) : new Date());
	const [startDate, setStartDate] = useState(date);

	return (
		<div className={`form-group ${readOnly && readOnly}`}>
			{label && (
				<label htmlFor={id} className="form-input--label">
					{label}
				</label>
			)}
			<DatePicker
				icon={<Icon name={readOnly? 'lock' : 'calendar'} size="md" className="text-muted" />}
				showIcon={true}
				selected={startDate}
				onChange={(date) => setStartDate(date as Date)}
				readOnly={readOnly}
				className={`form-input form-input--datetime ${readOnly? 'disabled' : ''}`}
			/>
		</div>
	);
}


export { InputDateTime, InputDate };
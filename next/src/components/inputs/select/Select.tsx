"use client";

import { IFormInput } from "../Inputs";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

interface PropsInputSelect extends IFormInput {
	options: string[];
	value: string;
}

export default function InputSelect({ value, label, options, id, onChange }: PropsInputSelect) {
	const [currentValue, setSelectedValue] = useState(value ? value : "");
	const [displayValue, setDisplayValue] = useState(value ? value : "Select an option");

	return (
		<div className="form-group form-select">
			<input
				type="hidden"
				name={id}
				value={currentValue}
				id={id}
				onChange={(event) => {
					onChange && onChange(event);
				}}
			/>
			{label && <label className="form-input--label">{label}</label>}
			<Dropdown>
				<Dropdown.Toggle variant="success" id={`dropdown-${id}`}>
					{displayValue && displayValue}
				</Dropdown.Toggle>
				<Dropdown.Menu>
					{options.map((option, index) => {
						return (
							<Dropdown.Item key={index} eventKey={option} active={currentValue === option}>
								<button
									className={`btn btn-select ${currentValue === option ? "active" : ""}`}
									onClick={() => {
										setSelectedValue(option);
										setDisplayValue(option);
									}}
								>
									{option}
								</button>
							</Dropdown.Item>
						);
					})}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
}

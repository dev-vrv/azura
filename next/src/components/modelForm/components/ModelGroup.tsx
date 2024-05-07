import MField from './ModelFields';


interface IAltSize {
	[key: string]: number;
}


export interface ISelect {
	[key: string]: string[]
}
export interface IFields {
	[key: string]: {
		type: string;
		value: string | boolean;
		required: boolean;
		readOnly?: boolean;
		selectOption?: string[];
		options?: string[];
	};
}

export interface IGroup {
	fields: IFields
	fieldsNames: (string | string[])[];
	description?: string;
	title?: string;
	colSize?: IAltSize | 'auto' | string | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
	rowSize?: IAltSize | 'auto' | string | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
	handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


function Field({fields, fieldName, handleChange}: {fields: IFields, fieldName: string, handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void}) {
	if (fields[fieldName]) {
		return (
			<MField 
				id={fieldName}
				type={fields[fieldName].type}
				value={fields[fieldName].value as string}
				required={fields[fieldName].required}
				readOnly={fields[fieldName].readOnly}
				handleChange={handleChange && handleChange}
				options={fields[fieldName].options}
			/>
		)
	}
	
}
function Fields({fields, fieldName, handleChange}: {fields: IFields, fieldName: string | string[], handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void}) {
	if (typeof fieldName === 'string' && Object.keys(fields).includes(fieldName)) {
		return (
			<Field fieldName={fieldName} fields={fields} handleChange={handleChange} />
		);
	}
	else if (Array.isArray(fieldName)) {
		return fieldName.map((name) => {
			if (Object.keys(fields).includes(name)) {
				return (
					<Field key={name} fieldName={name} fields={fields} handleChange={handleChange} />
				);
			}
		});
	}
}


export default function Group({fields, fieldsNames, description, title, colSize=6, rowSize=12, handleChange}: IGroup) {
	
	if (typeof colSize === 'object') {
		const obj = colSize;
		const result = Object.entries(obj)
			.map(([key, value]) => `col-${key}-${value}`)
			.join(' ');

		colSize = result;
	}
	else {
		colSize = `col-${colSize}`;
	}
	if (typeof rowSize === 'object') {
		const obj = rowSize;
		const result = Object.entries(obj)
			.map(([key, value]) => `col-${key}-${value}`)
			.join(' ');
		rowSize = result;
	}
	else {
		rowSize = `col-${rowSize}`;
	}

	const group = fieldsNames.map((value, index) => {
		return (
			<div className={`${colSize} d-flex flex-column gap-3`} key={index}>
				<Fields fieldName={value} fields={fields} handleChange={handleChange} />
			</div>
		);
	});
	return (
		<div className={`${rowSize} row g-3`}>
			<div className="col-12">
				<h4 className="h4 py-3">{title}</h4>
				<p>{description}</p>
			</div>
			{group}
		</div>
	);
}

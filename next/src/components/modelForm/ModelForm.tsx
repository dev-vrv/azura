import "./ModelForm.scss";
import Icon from "../Icons/Icons";
import { Input, Checkbox } from "@/components/fields/Input";

interface IFields {
	[key: string]: {
		type: string;
		value: string | boolean;
		required: boolean;
		readonly?: boolean;
	};
}
interface IGroup {
	fields: IFields
	fieldsNames: string[];
	description?: string;
	title?: string;
	colSize?: number;
}

interface PropsForm {
    className?: string;
	fields: IFields;
	endpoint?: string;
	groups?: IGroup[];
}

interface PropsField {
	id: string;
	type: string;
	value: string | boolean;
	required: boolean;
	disabled?: boolean;
}

function MField({type, id, value, required, disabled}: PropsField ) {
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
}


function Group({fields, fieldsNames, description, title, colSize=6}: IGroup) {
	const group = fieldsNames.map((key) => {
		if (Object.keys(fields).includes(key)) {
			return (
				<div className={`col-${colSize.toString()} d-flex flex-column`} key={key}>
					<MField 
						id={key}
						type={fields[key].type}
						value={fields[key].value}
						required={fields[key].required}
						disabled={fields[key].readonly}
					/>
				</div>
			);
		}
	});

	return (
		<>
			<div className="col-12 py-3">
				<h4 className="h4 py-3">{title}</h4>
				<p>{description}</p>
			</div>
			{group}
		</>
	);
}

export default function MForm({fields, className, endpoint, groups}: PropsForm) {

	const grouped = groups?.map((group) => {
		return (
			<Group 
				key={group.title}
				fields={group.fields}
				fieldsNames={group.fieldsNames}
				title={group.title}
				description={group.description}
				colSize={group.colSize}
			/>
		);
	});

	const notGrouped = Object.keys(fields).map((key) => {
		return (
			<div className="col-12" key={key}>
				<MField 
					id={key}
					type={fields[key].type}
					value={fields[key].value}
					required={fields[key].required}
				/>
			</div>
		);
	});

	return (
		<form className="model-form">
			<div className="model-form--header">
				<div className="d-flex gap-2">
					
				</div>
			</div>
			<div className="model-form--body">
				<div className="row g-3">
					{groups? grouped : notGrouped}
				</div>
			</div>
			<div className="model-form--footer">
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
		</form>
	);
}

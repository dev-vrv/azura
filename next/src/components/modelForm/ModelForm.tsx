import "./ModelForm.scss";

import MField from "./components/ModelFields";
import Group from "./components/ModelGroup";
import { IGroup, IFields } from "./components/ModelGroup";

interface PropsForm {
	fields: IFields;
	groups?: IGroup[];
    className?: string;
	endpoint?: string;
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
				rowSize={group.rowSize}
			/>
		);
	});

	const notGrouped = Object.keys(fields).map((key) => {
		return (
			<div className="col-6" key={key}>
				<MField 
					id={key}
					type={fields[key].type}
					value={fields[key].value}
					required={fields[key].required}
					readOnly={fields[key].readOnly}
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

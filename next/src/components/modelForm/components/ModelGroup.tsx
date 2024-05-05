import MField from './ModelFields';


export interface IFields {
	[key: string]: {
		type: string;
		value: string | boolean;
		required: boolean;
		readonly?: boolean;
	};
}

export interface IGroup {
	fields: IFields
	fieldsNames: (string | string[])[];
	description?: string;
	title?: string;
	colSize?: 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
	rowSize?: 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export default function Group({fields, fieldsNames, description, title, colSize=6, rowSize=12}: IGroup) {
	const group = fieldsNames.map((key) => {
		if (typeof key === 'string' && Object.keys(fields).includes(key)) {
			return (
				<div className={`col-${colSize}`} key={key}>
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
        else if (Array.isArray(key)) {
			const list = () => {
				return key.map((k) => {
					if (Object.keys(fields).includes(k)) {
						return (
							<div className={`col-${colSize}`} key={k}>
								<MField 
									id={k}
									type={fields[k].type}
									value={fields[k].value}
									required={fields[k].required}
									disabled={fields[k].readonly}
								/>
							</div>
						);
					}
					else {
						console.log(`Field ${k} not found`);
					}
				});
			}
            return (
                <div className={`col-${colSize.toString()} d-flex flex-column gap-3`} key={key[0]}>
                    {list()}
                </div>
            );
        }
	});
	return (
		<div className={`col-${rowSize} row g-3`}>
			<div className="col-12">
				<h4 className="h4 py-3">{title}</h4>
				<p>{description}</p>
			</div>
			{group}
		</div>
	);
}

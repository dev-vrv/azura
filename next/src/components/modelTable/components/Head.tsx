import { Checkbox } from "@/components/inputs/Inputs";

interface PropsHead {
	fields: string[];
	enumerate?: boolean;
	selectable?: boolean;
	selectedAll?: boolean;
	onSelectedAll?: (state: boolean) => void;
}

const THead = ({ fields, enumerate, selectable, selectedAll, onSelectedAll }: PropsHead) => {
	return (
		<thead>
			<tr>
				{selectable && (
					<th>
						<Checkbox
							id="all"
							checked={selectedAll}
							onChecked={(checked: boolean) => {
								{
									onSelectedAll && onSelectedAll(checked);
								}
							}}
						/>
					</th>
				)}
				{enumerate && <th>#</th>}
				{fields.map((field, index) => (
					<th key={index}>{field.replace("_", " ")}</th>
				))}
			</tr>
		</thead>
	);
};

export default THead;
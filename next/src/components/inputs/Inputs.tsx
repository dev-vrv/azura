import "./Inputs.scss";
import { InputDateTime, InputDate } from "./date/DateTime";
import Checkbox from "./checkbox/Checkbox";
import Input from "./input/Input";
import InputSelect from "./select/Select";

export interface IFormInput {
	id: string;
	name?: string;
	label?: string;
	className?: string;
	readOnly?: boolean;
	required?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export { Input, Checkbox, InputDateTime, InputDate, InputSelect };

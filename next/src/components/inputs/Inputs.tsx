import "./Inputs.scss";
import { InputDateTime, InputDate } from "./date/DateTime";
import Checkbox from "./checkbox/Checkbox";
import Input from "./input/Input";

export interface IField {
	id: string;
	name?: string;
	label?: string;
	className?: string;
	readOnly?: boolean;
	required?: boolean;
}


export interface PropsDateTime extends IField {
	value?: string;
}


export { Input, Checkbox, InputDateTime, InputDate };

import "./Inputs.scss";
import { FaCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Checkbox from "./checkbox/Checkbox";
import Input from "./input/Input";
import DateTime from "./date/DateTime";

interface IField {
	id: string;
	name?: string;
	label?: string;
	className?: string;
	disabled?: boolean;
	required?: boolean;
}

export interface PropsInput extends IField {
	type?: "text" | "password" | "email" | "number";
	placeholder?: string;
	value?: string;
}

export interface PropsCheckbox extends IField {
	checked?: boolean;
	onChecked?: (checked: boolean) => void;
}

export interface PropsDateTime extends IField {
	value?: string;
}


export { Input, Checkbox, DateTime };

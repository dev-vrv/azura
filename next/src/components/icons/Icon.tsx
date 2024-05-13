import React from "react";
import {
    CiAt,
	CiDark,
	CiLight,
	CiFilter
} from "react-icons/ci";


const ITheme = {
	dark: CiDark,
	light: CiLight
};

const IElse = {
	at: CiAt

};

const IUI = {
	filter: CiFilter
};

const IBundle = {
	...ITheme, ...IUI, ...IElse,
};

type TVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
type TSize = "6" | "5" | "4" | "3" | "2" | "1";

export interface PropsIcon {
	name: keyof typeof IBundle;
	inline?: boolean;
	size?: TSize;
	variant?: TVariant;
}

export default function Icon({ variant, size, inline, name }: PropsIcon) {
	const classNames = `${variant ? `text-${variant}` : ""} ${size ? `fs-${size}` : ""} ${inline ? "d-inline" : ""}`;
	const SvgIcon = IBundle[name];
	return (
        <i className={classNames}>
			<SvgIcon />
		</i>
    );
}

import React from "react";
import {
    CiAt,
	CiDark,
	CiLight,
	CiFilter,
	CiMonitor,
	CiUser,
	CiWavePulse1
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

const Apps = {
	'monitor': CiMonitor,
	'users': CiUser,
	'stats': CiWavePulse1
}

export const IBundle = {
	...ITheme, ...IUI, ...Apps, ...IElse,
};

type TVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
type TSize = "6" | "5" | "4" | "3" | "2" | "1";

export interface PropsIcon {
	name: string;
	inline?: boolean;
	size?: TSize;
	variant?: TVariant;
}

export default function Icon({ variant, size, inline, name }: PropsIcon) {
	const classNames = `${variant ? `text-${variant}` : ""} ${size ? `fs-${size}` : ""} ${inline ? "d-inline" : ""}`;
	let SvgIcon;
	if (Object.keys(IBundle).includes(name)) {
		SvgIcon = IBundle[name as keyof typeof IBundle];
	}
	else {
		SvgIcon = IBundle['at'];
	}
	return (
        <i className={classNames}>
			<SvgIcon />
		</i>
    );
}

import {
	CiLight,
	CiDark,
	CiUser,
	CiCircleList,
	CiMenuKebab,
	CiBeaker1,
	CiLink,
	CiChat2,
	CiCircleAlert,
	CiCircleCheck,
	CiCircleInfo,
	CiCircleQuestion,
	CiCirclePlus,
	CiCircleChevDown,
	CiCircleChevUp,
	CiCircleChevLeft,
	CiCircleChevRight,
	CiExport,
	CiImport,
	CiFilter,
	CiZoomIn,
	CiZoomOut,
	CiSearch,
	CiRedo,
	CiUndo,
	CiLogin,
	CiLogout,
    CiMail,
    CiLaptop,
    CiWavePulse1,
    CiGrid42,
    CiSettings,
    CiBellOn,
} from "react-icons/ci";

import { FaConnectdevelop } from "react-icons/fa";
import "./Icons.scss";

const interfaceIcons = {
	light: <CiLight />,
	dark: <CiDark />,
	menu: <CiMenuKebab />,
	lab: <CiBeaker1 />,
	link: <CiLink />,
	alert: <CiCircleAlert />,
	check: <CiCircleCheck />,
	info: <CiCircleInfo />,
	question: <CiCircleQuestion />,
	plus: <CiCirclePlus />,
	redo: <CiRedo />,
	undo: <CiUndo />,
	logo: <FaConnectdevelop />,
};

const actions = {
	search: <CiSearch />,
	export: <CiExport />,
	import: <CiImport />,
	filter: <CiFilter />,
    bell: <CiBellOn />,
    settings: <CiSettings />,
	"zoom-in": <CiZoomIn />,
	"zoom-out": <CiZoomOut />,
};

const userIcons = {
	user: <CiUser />,
	login: <CiLogin />,
	logout: <CiLogout />,
};

const directionIcons = {
	down: <CiCircleChevDown />,
	up: <CiCircleChevUp />,
	left: <CiCircleChevLeft />,
	right: <CiCircleChevRight />,
};

const adminPages = {
    main: <CiLaptop />,
	posts: <CiGrid42 />,
	monitor: <CiWavePulse1 />,
	celery: <CiCircleList />,
	chat: <CiChat2 />,
    mail: <CiMail />,
};

const icons = {...interfaceIcons, ...actions, ...userIcons, ...directionIcons, ...adminPages};

export interface PropsIcon {
	name: keyof typeof icons;
	size?: "sm" | "md" | "lg" | "xl" | "xxl";
	color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "white" | "dark";
	onClick?: () => void;
}

export default function Icon({ name, size = "md", onClick }: PropsIcon) {
	return (
		<i className={`i i--${size}`} onClick={onClick}>
			{icons[name]}
		</i>
	);
}

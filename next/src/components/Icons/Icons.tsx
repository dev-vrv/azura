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
	CiLock,
	CiCalendar,
	CiTrash

} from "react-icons/ci";

import { RiLoader2Line } from "react-icons/ri";
import { FaConnectdevelop, FaPen, FaCheck } from "react-icons/fa";
import "./Icons.scss";

const iconsUI = {
	light: <CiLight />,
	dark: <CiDark />,
	menu: <CiMenuKebab />,
	lab: <CiBeaker1 />,
	link: <CiLink />,
	alert: <CiCircleAlert />,
	check: <FaCheck />,
	info: <CiCircleInfo />,
	question: <CiCircleQuestion />,
	plus: <CiCirclePlus />,
	redo: <CiRedo />,
	undo: <CiUndo />,
	logo: <FaConnectdevelop />,
	loading: <RiLoader2Line />,
	change: <FaPen />,
	calendar: <CiCalendar />,
	lock: <CiLock />,
	trash: <CiTrash />,
};
const iconsActions = {
	search: <CiSearch />,
	export: <CiExport />,
	import: <CiImport />,
	filter: <CiFilter />,
    bell: <CiBellOn />,
    settings: <CiSettings />,
	"zoom-in": <CiZoomIn />,
	"zoom-out": <CiZoomOut />,
};
const iconsUser = {
	user: <CiUser />,
	login: <CiLogin />,
	logout: <CiLogout />,
};
const iconsDirection = {
	down: <CiCircleChevDown />,
	up: <CiCircleChevUp />,
	left: <CiCircleChevLeft />,
	right: <CiCircleChevRight />,
};
const iconsAdmin = {
    main: <CiLaptop />,
	posts: <CiGrid42 />,
	monitor: <CiWavePulse1 />,
	celery: <CiCircleList />,
	chat: <CiChat2 />,
    mail: <CiMail />,
};
const icons = {...iconsUI, ...iconsActions, ...iconsUser, ...iconsDirection, ...iconsAdmin};

export interface PropsIcon {
	name: keyof typeof icons;
	size?: "sm" | "md" | "lg" | "xl" | "xxl";
	color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "white" | "dark";
	className?: string;
}

export default function Icon({ name, className, size = "md" }: PropsIcon) {
	return (
		<i className={`i i--${size} ${className || ''}`}>
			{icons[name]}
		</i>
	);
}

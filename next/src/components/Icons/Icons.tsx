import { 
    CiLight, // Light
    CiDark, // Dark

    CiUser, // User
    CiCircleList, // List
    CiMenuKebab, // Menu kebab
    CiBeaker1, // Beaker *(Lab)*
    CiLink, // Link
    CiChat2, // Chat
    CiMonitor, // Monitor
    
    CiCircleAlert, // Alert circle
    CiCircleCheck, // Check circle
    CiCircleInfo, // Info circle
    CiCircleQuestion, // Question circle
    CiCirclePlus, // Plus circle

    CiCircleChevDown, // Arrow up
    CiCircleChevUp, // Arrow down
    CiCircleChevLeft, // Arrow left
    CiCircleChevRight, // Arrow right

    CiExport, // Export
    CiImport, // Import
    CiFilter, // Filter
    CiZoomIn, // Zoom in
    CiZoomOut, // Zoom out
    CiSearch, // Search
    CiRedo, // Redo
    CiUndo, // Undo

    CiLogin, // Login
    CiLogout, // Logout
} from "react-icons/ci";

import { FaConnectdevelop } from "react-icons/fa";
import './Icons.scss';


const icons = {
    'light': <CiLight />,
    'dark': <CiDark />,
    'user': <CiUser />,
    'list': <CiCircleList />,
    'menu': <CiMenuKebab />,
    'lab': <CiBeaker1 />,
    'link': <CiLink />,
    'chat': <CiChat2 />,
    'monitor': <CiMonitor />,
    'alert': <CiCircleAlert />,
    'check': <CiCircleCheck />,
    'info': <CiCircleInfo />,
    'question': <CiCircleQuestion />,
    'plus': <CiCirclePlus />,
    'up': <CiCircleChevUp />,
    'down': <CiCircleChevDown />,
    'left': <CiCircleChevLeft />,
    'right': <CiCircleChevRight />,
    'export': <CiExport />,
    'import': <CiImport />,
    'filter': <CiFilter />,
    'zoom-in': <CiZoomIn />,
    'zoom-out': <CiZoomOut />,
    'search': <CiSearch />,
    'redo': <CiRedo />,
    'undo': <CiUndo />,
    'login': <CiLogin />,
    'logout': <CiLogout />,

    'logo': <FaConnectdevelop />,
};

export interface IPropsIcon {
    name: keyof typeof icons;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'white' | 'dark';
    onClick?: () => void;
}

export default function Icon({name, size = 'md', color = 'dark', onClick}: IPropsIcon) {
    return (
        <i className={`i i--${size} i--${color}`} onClick={onClick}>
            {icons[name]}
        </i>
    )
}
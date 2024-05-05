import { PropsIcon } from "@/components/Icons/Icons";
import Icon from "@/components/Icons/Icons";

interface PropsButton {
	onClick?: () => void;
	children?: string;
	className?: string;
	icon?: PropsIcon;
	type?: "submit" | "reset" | "button";
	variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "icon";
}

const Button = ({ onClick, icon, children, className, variant, type = "button" }: PropsButton) => {
	if (!variant && icon) {
		variant = "icon";
	}
    else {
        variant = "primary";
    }

	return (
		<button 
            type={type} 
            className={`btn ${variant && "btn-" + variant} ${className && className}`}
            onClick={onClick}
        >
			{icon && <Icon name={icon.name} size={icon.size} />}
			{children && children}
		</button>
	);
};

export { Button };

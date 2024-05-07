'use client';

import { PropsIcon } from "@/components/Icons/Icons";
import Icon from "@/components/Icons/Icons";
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

type variant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "icon" | "exit";

interface PropsButton {
	onClick?: () => void;
	disabled?: boolean;
	children?: React.ReactNode;
	className?: string;
	icon?: PropsIcon;
	type?: "submit" | "reset" | "button";
	variant?: variant;
	confirm?: boolean;
	confirmTitle?: string;
	confirmText?: string;
}

interface PropsConfirmDialog {
	show: boolean;
	onHide: () => void;
	onConfirm: () => void;
	variant?: variant;
	confirmText?: string;
	confirmTitle?: string;
}

const ConfirmDialog = ({ show, onHide, onConfirm, variant, confirmTitle, confirmText }: PropsConfirmDialog) => {
	return (
		<Modal show={show} centered color="dark" onHide={onHide}>
			<Modal.Header>
				<Modal.Title>
					<h4 className="h4">
						{confirmTitle}
					</h4>
				</Modal.Title>
				<Button variant="exit" onClick={onHide}></Button>
			</Modal.Header>
			<Modal.Body>
				<p className="fs-5">
					{confirmText}
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>
					Close
				</Button>
				<Button variant={variant} onClick={() => {
					onConfirm();
					onHide();
				}}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

const Button = ({
	onClick,
	icon,
	children,
	className,
	variant,
	type = "button",
	disabled,
	confirm,
	confirmText,
	confirmTitle,
}: PropsButton) => {

	const [confirmShow, setConfirmShow] = useState(false);

	if (!variant && icon) {
		variant = "icon";
	} else {
		variant = variant || "primary";
	}
	
	function handleConfirm() {
		if (onClick) {
			onClick();
		}
	}
	return (
		<>
		<button
			type={type}
			className={`btn ${variant && "btn-" + variant} ${className ? className : ""}`}
			onClick={confirm ? () => setConfirmShow(true) : onClick}
			disabled={disabled}
		>
			{icon && <Icon name={icon.name} size={icon.size} />}
			{children && children}
		</button>

		{confirm && confirmText && (
			<ConfirmDialog
				show={confirmShow}
				onHide={() => setConfirmShow(false)}
				onConfirm={handleConfirm}
				variant={variant}
				confirmTitle={confirmTitle}
				confirmText={confirmText}
			/>
		)}
		</>
	);
};

export { Button };

import Modal from 'react-bootstrap/Modal';
import React from 'react';
import './Dialog.scss';

interface DialogProps {
	id: string;
	title: string;
	children: React.ReactNode;
	show: boolean;
	onHide: () => void;
	actions?: React.ReactNode;
}

export default function Dialog(props: DialogProps) {
  return (
		<Modal {...props} size="xl" centered>
			<Modal.Header closeButton>
				<Modal.Title id={props.id}>{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.children}</Modal.Body>
			{props.actions && <Modal.Footer>{props.actions}</Modal.Footer>}
		</Modal>
  );
}

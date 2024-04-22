import Modal from 'react-bootstrap/Modal';

interface DialogProps {
    header: string;
    children: React.ReactNode;
    onHide: () => void;
    show: boolean;
    size?: 'sm' | 'lg' | 'xl';
    footerChild?: React.ReactNode;
}

function MyVerticallyCenteredModal(props: DialogProps) {
    return (
        <Modal
            {...props}
            size={props.size || 'lg'} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {props.footerChild? props.footerChild : null}
            </Modal.Footer>
        </Modal>
    );
}

export default MyVerticallyCenteredModal;
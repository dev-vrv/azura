import { CiBellOn } from "react-icons/ci";
import { useState } from 'react';
import MyVerticallyCenteredModal from '@/components/dialogs/Dialog';


export function DialogButton({ onClick }: { onClick: () => void }) {
    return (
        <button className='btn-tools' data-btn-title='Settings' onClick={onClick}>
            <CiBellOn />
        </button>
    );
}

export default function NotificationsTools() {
    const [modalShow, setModalShow] = useState(false);

    return (
		<>
			<DialogButton onClick={() => setModalShow(true)} />
			<MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} header="Notifications" size="lg">
				<div className="row">
					<div className="col-3">
					</div>
                    <div className="col-3"></div>
                    <div className="col-3"></div>
					<div className="col-3">
						<ul className="list">
						</ul>
					</div>
				</div>
			</MyVerticallyCenteredModal>
		</>
	);
}
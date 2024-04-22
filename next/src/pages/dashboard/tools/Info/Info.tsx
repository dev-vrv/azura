import { CiCircleInfo } from "react-icons/ci"
import { useState } from 'react';
import MyVerticallyCenteredModal from '@/components/dialogs/Dialog';


export function DialogButton({ onClick }: { onClick: () => void }) {
    return (
        <button className='btn' data-btn-title='Info' onClick={onClick}>
            <CiCircleInfo />
        </button>
    );
}

export default function InfoTools() {
    const [modalShow, setModalShow] = useState(false);

    return (
		<>
			<DialogButton onClick={() => setModalShow(true)} />
			<MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} header="Info" size="lg">
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
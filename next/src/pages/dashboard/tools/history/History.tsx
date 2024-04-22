import { CiTimer } from "react-icons/ci";
import { useState } from 'react';
import MyVerticallyCenteredModal from "@/components/dialogs/Dialog";

export function DialogButton({ onClick }: { onClick: () => void }) {
    return (
        <button className='btn-tools' data-btn-title='Settings' onClick={onClick}>
            <CiTimer />
        </button>
    );
}

export default function HistoryTools() {
    const [modalShow, setModalShow] = useState(false);

    return (
		<>
			<DialogButton onClick={() => setModalShow(true)} />
			<MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} header="History" size="lg">
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
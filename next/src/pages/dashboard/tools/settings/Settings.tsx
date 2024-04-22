import React, { useState } from 'react';
import MyVerticallyCenteredModal from '@/components/dialogs/Dialog';
import {  CiSettings } from "react-icons/ci";
import {
	RiFilePaper2Line,
	RiCloudLine,
	RiCollageFill,
	RiBug2Line,
} from "react-icons/ri";

export function DialogButton({ onClick }: { onClick: () => void }) {
    return (
        <button className='btn-tools' data-btn-title='Settings' onClick={onClick}>
            <CiSettings />
        </button>
    );
}

export default function SettingsTools() {
    const [modalShow, setModalShow] = useState(false);

    return (
		<>
			<DialogButton onClick={() => setModalShow(true)} />
			<MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} header="Settings" size="xl">
				<div className="row">
					<div className="col-3">
					</div>
                    <div className="col-3"></div>
                    <div className="col-3"></div>
					<div className="col-3">
						<ul className="list">
							<li>
								<button type="button" className="btn btn-fade w-100">
									<i>
										<RiCloudLine />
									</i>
									<span>Clear Cache</span>
								</button>
								<p>
									<span></span>
									<span></span>
								</p>
							</li>
							<li>
								<button type="button" className="btn btn-fade w-100">
									<i>
										<RiCollageFill />
									</i>
									<span>Drop Static</span>
								</button>
								<p>
									<span></span>
									<span></span>
								</p>
							</li>
							<li>
								<button type="button" className="btn btn-fade w-100">
									<i>
										<RiFilePaper2Line />
									</i>
									<span>Show Logs</span>
								</button>
								<p>
									<span></span>
									<span></span>
								</p>
							</li>
							<li>
								<button type="button" className="btn btn-fade w-100 disabled">
									<i>
										<RiBug2Line />
									</i>
									<span>Bug Report</span>
								</button>
								<p>
									<span></span>
									<span></span>
								</p>
							</li>
							<li>
								<button type="button" className="btn btn-fade w-100 disabled">
									<i>
										<RiBug2Line />
									</i>
									<span>Start Debug</span>
								</button>
								<p>
									<span></span>
									<span></span>
								</p>
							</li>
						</ul>
					</div>
				</div>
			</MyVerticallyCenteredModal>
		</>
	);
}
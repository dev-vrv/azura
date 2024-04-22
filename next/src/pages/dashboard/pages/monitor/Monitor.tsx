import React from 'react'
import Card from '../../../../components/card/Card'
import './Monitor.scss'

export default function Monitor() {
    return (
		<div className="container-fluid monitor">
			<div className="row h-100 g-3">
				<div className="col-9 h-100">
					<Card>
						<h1>Monitor</h1>
					</Card>
				</div>
				<div className="col-3 h-100 d-flex flex-column gap-3">
					<div className="w-100 h-25">
						<Card></Card>
					</div>
					<div className="w-100 h-75">
						<Card></Card>
					</div>
				</div>
			</div>
		</div>
	);
}
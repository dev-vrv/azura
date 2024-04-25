import Section from "@/components/section/Section";
import axios from "axios";
import React, { useEffect } from "react";
import useStats from '@/hooks/socket';

export default function Monitor() {

	const stats = useStats();
	console.log(stats);

	return (
		<div className="row h-100 g-3">
			<div className="col-9">
				<Section extraClass="section">
					<h2>Monitor</h2>
				</Section>
			</div>
			<div className="col-3 h-100 d-flex flex-column gap-3">
				<Section extraClass="section h-25">
					<ul>
						<li>
							<span></span>
							<i></i>
						</li>
						<li>
							<span></span>
							<i></i>
						</li>
						<li>
							<span></span>
							<i></i>
						</li>
						<li>
							<span></span>
							<i></i>
						</li>
					</ul>
				</Section>
				<Section extraClass="section h-75">
					<h2>actions</h2>
				</Section>
			</div>
		</div>
	);
}

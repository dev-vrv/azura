import Section from "@/components/section/Section";
import axios from "axios";
import React, { useEffect } from "react";
import useStats from "@/hooks/socketMonitor";
import { RiTimeZoneFill, RiTimer2Line, RiShining2Line, RiUser3Line } from "react-icons/ri";
import { CPUMonitor, DiskMonitor, MemoryMonitor, CombinedMonitor } from "./Widgets";
import { InterfaceStats } from "@/hooks/socketMonitor";
import Spinner from "@/components/spinner/Spinner";

function statsWidgets(stats: InterfaceStats) {
	const { site, system } = stats || {};
	return (
		<div className="row h-100 w-100">
			<div className="col-6 h-50" data-aos="zoom-in" data-aos-duration="500" data-aos-delay="500"></div>
			<div
				className="col-6 h-50 d-flex flex-column justify-content-center"
				data-aos="zoom-in"
				data-aos-duration="500"
				data-aos-delay="200"
			></div>

			<div
				className="col-6 h-50 d-flex flex-column justify-content-center"
				data-aos="zoom-in"
				data-aos-duration="500"
				data-aos-delay="600"
			>
				<CombinedMonitor queries={site.queries} requests={site.requests} />
			</div>
			<div
				className="col-2 h-50 d-flex flex-column justify-content-center gap-2"
				data-aos="zoom-in"
				data-aos-duration="500"
				data-aos-delay="700"
			>
				<h5 className="h5">Memory</h5>
				<MemoryMonitor {...system.memory} />
			</div>
			<div
				className="col-2 h-50 d-flex flex-column justify-content-center gap-2"
				data-aos="zoom-in"
				data-aos-duration="500"
				data-aos-delay="750"
			>
				<h5 className="h5">Disk</h5>
				<DiskMonitor {...system.disk} />
			</div>
			<div
				className="col-2 h-50 d-flex flex-column justify-content-center gap-2"
				data-aos="zoom-in"
				data-aos-duration="500"
				data-aos-delay="800"
			>
				<h5 className="h5">CPU</h5>
				<CPUMonitor {...system.cpu} />
			</div>
		</div>
	);
}

export default function Monitor() {
	const stats = useStats();

	return (
		<div className="row h-100 g-3">
			<div className="col-9">
				<Section extraClass="section">
					{stats?.site && stats?.system ? statsWidgets(stats) : <Spinner />}
				</Section>
			</div>
			<div className="col-3 h-100 d-flex flex-column gap-3">
				<Section extraClass="section h-fit">
					<ul className="list">
						<li>
							<p className="text-fade">
								<i>
									<RiUser3Line />
								</i>
								<span>User</span>
							</p>
							<p>dev.vrv@gmail.com</p>
						</li>
						<li>
							<p className="text-fade">
								<i>
									<RiShining2Line />
								</i>
								<span>Status</span>
							</p>
							<p>Admin</p>
						</li>
						<li>
							<p className="text-fade">
								<i>
									<RiTimer2Line />
								</i>
								<span>Date Time</span>
							</p>
							<p>
								{stats?.site?.time ? (
									<span data-aos="zoom-in" data-aos-duration="500">
										{stats.site.time}
									</span>
								) : (
									"--"
								)}{" "}
								- {""}
								{stats?.site?.date ? (
									<span data-aos="zoom-in" data-aos-duration="500">
										{stats.site.date}
									</span>
								) : (
									"--"
								)}
							</p>
						</li>
						<li>
							<p className="text-fade">
								<i>
									<RiTimeZoneFill />
								</i>
								<span>Time Zone</span>
							</p>
							<p>
								{stats?.site?.timezone ? (
									<span data-aos="zoom-in" data-aos-duration="500">
										{stats.site.timezone}
									</span>
								) : (
									"--"
								)}
							</p>
						</li>
					</ul>
				</Section>
				<Section extraClass="section flex-column gap-3">
					<h2>History</h2>
					<ul className="list py-2 justify-content-start">
						<li>
							<p>Admin</p>
							<p>User same was changed</p>
						</li>
						<li>
							<p>Admin</p>
							<p>Celery task was changed</p>
						</li>
						<li>
							<p>Admin</p>
							<p>Mails was deleted</p>
						</li>
					</ul>
				</Section>
			</div>
		</div>
	);
}

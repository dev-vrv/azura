import React from "react";
import { FaCarrot } from "react-icons/fa6";

export default function Aside() {
	return (
		<aside className="aside">
			<div className="aside--header">
				<i>
					<FaCarrot />
				</i>
			</div>
			<div className="aside--body">
				<nav className="aside--nav">
					<ul>
						<li>
							<a href="/dashboard">
								<i>
									<FaCarrot />
								</i>
							</a>
						</li>
						<li>
							<a href="/dashboard">
								<i>
									<FaCarrot />
								</i>
							</a>
						</li>
						<li>
							<a href="/dashboard">
								<i>
									<FaCarrot />
								</i>
							</a>
						</li>
						<li>
							<a href="/dashboard">
								<i>
									<FaCarrot />
								</i>
							</a>
						</li>
					</ul>
				</nav>
			</div>
			<div className="aside--footer"></div>
		</aside>
	);
}

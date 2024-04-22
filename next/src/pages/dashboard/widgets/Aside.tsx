import React from "react";


import { CiUser, CiMonitor, CiWavePulse1, CiBoxList, CiChat2, CiMail, CiShoppingCart, CiCircleInfo, CiViewList } from "react-icons/ci";
import { SiBaremetrics } from "react-icons/si";

export default function Aside() {
	return (
		<aside className="aside">
			<div className="aside--header">
				<i>
					<SiBaremetrics />
				</i>
			</div>
			<div className="aside--body">
				<nav className="aside--nav">
					<ul>
						<li>
							<a href="/monitor" className="btn btn-aside">
								<i>
									<CiMonitor />
								</i>
							</a>
						</li>
						<li>
							<a href="/stats" className="btn btn-aside">
								<i>
									<CiWavePulse1 />
								</i>
							</a>
						</li>
						<li>
							<a href="/users" className="btn btn-aside">
								<i>
									<CiUser />
								</i>
							</a>
						</li>
						<li>
							<a href="/mail" className="btn btn-aside">
								<i>
									<CiMail />
								</i>
							</a>
						</li>
						<li>
							<a href="/chat" className="btn btn-aside">
								<i>
									<CiChat2 />
								</i>
							</a>
						</li>
						<li>
							<a href="/celery" className="btn btn-aside">
								<i>
									<CiBoxList />
								</i>
							</a>
						</li>
						<li>
							<a href="/orders" className="btn btn-aside">
								<i>
									<CiViewList />
								</i>
							</a>
						</li>
						<li>
							<a href="/carts" className="btn btn-aside">
								<i>
									<CiShoppingCart />
								</i>
							</a>
						</li>

					</ul>
				</nav>
			</div>
			<div className="aside--footer">
				<button className="btn btn-info">
					<i><CiCircleInfo/></i>
				</button>
			</div>
		</aside>
	);
}

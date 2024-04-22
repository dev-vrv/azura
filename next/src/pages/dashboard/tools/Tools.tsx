import "./Tools.scss";
import { CiLogout, CiDark } from "react-icons/ci";
import SettingsTools from "./settings/Settings";
import NotificationsTools from "./notifications/Notifications";
import HistoryTools from "./history/History";

export default function Tools() {
	return (
		<ul className="tools-list">
			<li>
				<NotificationsTools />
			</li>
			<li>
				<HistoryTools />
			</li>
			<li>
				<SettingsTools />
			</li>
			<li>
				<button className="btn-tools" data-btn-title="Dark \ Light">
					<CiDark />
				</button>
			</li>
			<li>
				<button className="btn-tools" data-btn-title="Logout">
					<CiLogout />
				</button>
			</li>
		</ul>
	);
}

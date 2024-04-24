import { CiMonitor, CiBoxList, CiChat2, CiMail, CiUser, CiWavePulse1, CiCircleInfo } from "react-icons/ci";
import './Aside.scss';
import { RiPlanetLine } from "react-icons/ri";

interface PropsAside {
	setActiveSection: (section: string) => void;
	activeSection?: string;
}

function AsideButtons({ activeSection, setActiveSection }: PropsAside) {
	const buttons = [
		{ icon: <CiMonitor />, section: "monitor" },
		{ icon: <CiWavePulse1 />, section: "stats" },
		{ icon: <CiUser />, section: "users" },
		{ icon: <CiBoxList />, section: "celery" },
		{ icon: <CiMail />, section: "mail" },
		{ icon: <CiChat2 />, section: "chat" },
	];

	return buttons.map((button, index) => (
		<li key={index}>
			<button
				className={`btn btn-aside ${activeSection === button.section ? "active" : ""}`}
				type="button"
				onClick={() => setActiveSection(button.section)}
			>
				<i>{button.icon}</i>
			</button>
		</li>
	));

}

export default function Aside({ activeSection, setActiveSection }: PropsAside) {
	return (
		<aside className="aside">
			<div className="aside__header">
				<i><RiPlanetLine/></i>
			</div>
			<nav className="aside__nav">
				<ul>
					<AsideButtons activeSection={activeSection} setActiveSection={setActiveSection} />
				</ul>
			</nav>
			<div className="aside__footer">
				<button className="btn btn-info">
					<i><CiCircleInfo/></i>
				</button>
			</div>
		</aside>
	);
}

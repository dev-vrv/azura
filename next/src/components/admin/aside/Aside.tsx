import Icon from "@/components/icons/Icon";
import AsideNav from "@/components/admin/aside/AsideNav";
import './Aside.scss';

interface PropsAside {
	apps: any;
}

export default function Aside({apps}: PropsAside) {
	console.log(apps);
    return (
		<aside className="aside d-flex flex-column align-items-center justify-content-between h-100 py-3">
			<h5 className="d-flex">
				<Icon name="logo" size={1}/>
			</h5>
			<AsideNav />
			<div className="aside__footer"></div>
		</aside>
	);
}

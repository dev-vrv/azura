import Icon from "@/components/icons/Icon";
import AsideNav from "@/components/admin/aside/AsideNav";

interface PropsAside {}

export default function Aside({}: PropsAside) {
    return (
		<aside className="aside d-flex flex-column align-items-center justify-content-between gap-3 py-3 h-100">
			<h5 className="d-flex gap-1">
				<Icon name="at"/>
				<span>Azura</span>
			</h5>
			<AsideNav />
			<div className="aside__footer"></div>
		</aside>
	);
}

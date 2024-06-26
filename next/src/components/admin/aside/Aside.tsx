import Icon from "@/components/icons/Icon";
import './Aside.scss';

interface PropsAside {}

export default function Aside({}: PropsAside) {
    return (
		<aside className="aside d-flex flex-column align-items-center justify-content-between h-100 py-3">
			<h5 className="d-flex">
				<Icon name="logo" size="1"/>
			</h5>

			<div className="aside__footer"></div>
		</aside>
	);
}

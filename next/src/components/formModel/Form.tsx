import "./Form.scss";
import Icon from "../Icons/Icons";
import { useRouter } from "next/router";

interface PropsForm {
    back?: () => void;
}

export default function MForm(props: PropsForm) {
    const { back } = props;
	return (
		<form className="model-form">
			<div className="model-form--header">
				<div className="d-flex gap-2">
					{back && (
						<button className="btn btn-icon" onClick={() => back()}>
							<Icon name="left" size="xl" />
						</button>
					)}
					<h2>User</h2>
				</div>
			</div>
			<div className="model-form--body"></div>
			<div className="model-form--footer">
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
		</form>
	);
}

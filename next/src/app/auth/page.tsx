import Image from "next/image";
import FormAuth from "@/components/forms/FormAuth";
import Section from "@/components/section/Section";
import './page.scss';


export default function Auth() {
	return (
		<div className="container-fluid h-100">
			<div className="row h-100 d-flex justify-content-center align-items-center p-3">
				<div className="col-12 col-md-6 col-lg-5 col-xl-4">
					<Section>
						<FormAuth endPoint="user/sign-in/" />
					</Section>
				</div>
			</div>
		</div>
	);
}

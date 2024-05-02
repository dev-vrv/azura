import Image from "next/image";
import FormAuth from "@/components/forms/FormAuth";
import Section from "@/components/section/Section";
import '@/assets/scss/style.scss';
import './page.scss';


export default function Auth() {
	return (
		<main className="main container-fluid h-100"
			style={{ 
				backgroundImage: "url('https://wallpapertag.com/wallpaper/full/2/3/a/191147-vertical-black-gradient-background-1920x1080-photos.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center"
			}}
		>
			<div className="row h-100 d-flex justify-content-center align-items-center p-3">
				<div className="col-12 col-md-6 col-lg-5 col-xl-4">
					<Section>
						<FormAuth endPoint="user/sign-in/" />
					</Section>
				</div>
			</div>
		</main>
	);
}

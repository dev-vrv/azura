"use client";

import { useEffect, useContext } from "react";
import Aside from "@/components/admin/Aside/Aside";
import Header from "@/components/admin/Header/Header";
import AOS from "aos";
import "aos/dist/aos.css";
import "@/assets/scss/style.scss";
import { AppContextProvider } from "@/context/AppContext";
import { AppContext, IAppContext } from "@/context/AppContext";
import AlertView from "@/components/alert/AlertView";


export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	useEffect(() => {
		AOS.init({ duration: 300, easing: "ease-in-out", once: true });
	}, []);

	const NotificationElements = () =>{
		const { notifications, setNotifications } = useContext<IAppContext>(AppContext);


		const notSeenNotifications = notifications;

		return (
			<div className={`alert-list ${notSeenNotifications.length > 1? 'show' : ''}`}>
				{notSeenNotifications.map((notification, index) => (
				<AlertView 
					key={index + notification.id}
					text={notification.message || ''}
					type={notification.type}
					onClose={() => {

					}}
				/>
				))}
			</div>
		  
		);
	}

	return (
		<html lang="en">
			<body>
				<div className="container-fluid d-flex h-100">
					<div className="h-100 w-fit">
						<Aside
							links={[
								{ href: "/admin", icon: { name: "main", size: "xl" } },
								{ href: "/admin/users", icon: { name: "user", size: "xl" } },
								{ href: "/admin/monitor", icon: { name: "monitor", size: "xl" } },
								{ href: "/admin/celery", icon: { name: "celery", size: "xl" } },
								{ href: "/admin/mail", icon: { name: "mail", size: "xl" } },
								{ href: "/admin/chat", icon: { name: "chat", size: "xl" } },
							]}
						/>
					</div>
					<div className="h-100 w-100 d-flex flex-column">
						<AppContextProvider>
							<Header />
							{children}
							<NotificationElements />
						</AppContextProvider>
					</div>
				</div>
			</body>
		</html>
	);
}

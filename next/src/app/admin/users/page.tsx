import Section from "@/components/section/Section";
import TModel from "@/components/modelTable/Table";
import { EndPoints, IEndPoint } from "@/api/endPoints";

export default function PageUsers() {
	const endPointUsers = new EndPoints().getPointUser("getUsers") as IEndPoint;

	return (
		<main className="main">
			<Section className="h-100">
				<TModel
					{...{
						fields: [
							"id",
							"email",
							"role",
							"phone",
							"first_name",
							"last_name",
							"status",
							"country",
							"city",
							"address",
							"created_at",
						],
						options: {
							add: true,
							selectable: true,
							title: "Users",
						},
						url: endPointUsers.path,
					}}
				/>
			</Section>
		</main>
	);
}

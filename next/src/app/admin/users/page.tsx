import Section from '@/components/section/Section';
import ModelTable from '@/components/table/Table';
import { endPointUser } from '@/api/endPoints';

console.log(endPointUser.controller.getUsers);
export default function PageUsers() {
    return (
		<main className="main container-fluid">
			<Section className="h-100">
				<ModelTable {...{
					title: 'User',
					fields: ['id', 'email', 'first_name', 'last_name', 'role', 'status', 'created_at'],
					field_link: 'email',
					selectable: true,
					add: true,
					actions: true,
					endpoint: endPointUser.controller.getUsers,
				}} />
			</Section>
		</main>
	);
}
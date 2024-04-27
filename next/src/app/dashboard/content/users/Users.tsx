import Section from "@/components/section/Section";
import TableData from "@/components/table/Table";
import CheckBox from "@/components/checkbox/CheckBox";
import { FormSearch } from "@/components/forms/Forms";
import { CiCirclePlus, CiFilter } from "react-icons/ci";
import axios from "axios";

export default function Users() {
	return (
		<div className="row h-100">
			<div className="col-12">
				<Section extraClass="container-fluid section section-model flex-column gap-4">
					<div className="row section-model__header">
						<div className="col">
							<h3 className="h3">Users</h3>
						</div>
						<div className="col d-flex justify-content-end gap-4">
							<FormSearch />
							<button className="btn btn-secondary">
								<span>Filter</span>
								<i>
									<CiFilter />
								</i>
							</button>
							<button className="btn btn-success">
								<span>User</span>
								<i>
									<CiCirclePlus />
								</i>
							</button>
						</div>
					</div>
					<div className="row section-model__body">
						<TableData {...{
							'endPoint': {
								'url': 'http://127.0.0.1:8000/users/controller/',
								'method': 'GET'
							},
							'listDisplay': ['id', 'email', 'tell', 'first_name', 'last_name', 'status', 'role', 'created_at'],
							'listDisplayLink': 'email',
							'sort': true,
							'select': true,
						}} />
					</div>
					<div className="row section-model__footer"></div>
				</Section>
			</div>
		</div>
	);
}

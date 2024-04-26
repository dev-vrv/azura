"use client";

import Section from "@/components/section/Section";
import Table from "@/components/table/Table";
import CheckBox from "@/components/checkbox/CheckBox";
import { FormSearch } from "@/components/forms/Forms";

export default function Users() {
	return (
		<div className="row h-100">
			<div className="col-12">
				<Section extraClass="container-fluid section section-model flex-column gap-4">
					<div className="row section-model__header">
						<div className="col">
							<h3 className="h3">Users</h3>
						</div>
						<div className="col d-flex justify-content-end">
							<FormSearch />
							<button className="btn btn-secondary">
								<span>Filters</span>
							</button>
							<button className="btn btn-secondary">
								<span>Add User</span>
							</button>
						</div>
					</div>
					<div className="row section-model__body">
						<Table {...{labels: [
							 <CheckBox id='users-all' key={'users-all'} />, 
								'ID', 
								'Email', 
								'First Name',
								'Last Name',
								'Role', 
								'Status', 
								'Created', 
								'Actions'
						]}} />
					</div>
					<div className="row section-model__footer"></div>
				</Section>
			</div>
		</div>
	);
}

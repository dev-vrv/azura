'use client';

import Section from "@/components/section/Section";
import ModelView from "@/components/table/Table";
import CheckBox from "@/components/checkbox/CheckBox";
import React, { useState } from "react";
import { FormSearch } from "@/components/forms/Forms";
import { CiCirclePlus, CiFilter, CiRedo } from "react-icons/ci";
import axios from "axios";


export default function Users() {
	return (
		<div className="row h-100">
			<div className="col-12">
				<Section extraClass="container-fluid section section-model flex-column gap-4">
					<ModelView {...{
							name: "Users",
							listDisplay: ["email", "first_name", "last_name", "tell", "role", "status", "created_at"],
							selectable: true,
							enumerate: true,
							endPoint: {
								url: "http://127.0.0.1:8000/users/controller/",
							},
							actions: {
								add: true,
								filter: true,
								refresh: true,
								search: true,
							}
						}} />
				</Section>
			</div>
		</div>
	);
}

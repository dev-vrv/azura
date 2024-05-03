"use client";

import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "../spinner/Spinner";
import "./Table.scss";
import { Checkbox } from "../fields/Input";
import Link from "next/link";
import Icon from "../Icons/Icons";
// import { IEndPoint } from "@/api/endPoints";

interface ModelData {
	id: string;
	[key: string]: string;
}

interface ModelTableHeadProps {
	fields: string[];
	enumerate?: boolean;
	selectable?: boolean;
	edit?: boolean;
}

interface ModelTableBodyProps extends ModelTableHeadProps {
	modelData: ModelData[];
	loading: boolean;
	error: boolean;
	endpoint: string;
}

interface ModelTableProps {
	title: string;
	fields: string[];
	endpoint: string;
	selectable?: boolean;
	enumerate?: boolean;
	add?: boolean;
	edit?: boolean;
	actions?: boolean;
	variant: "dark" | "light";
}

function Head({ fields, enumerate, selectable, edit }: ModelTableHeadProps) {
	return (
		<thead>
			<tr>
				{selectable && (
					<th>
						<Checkbox id="all" />
					</th>
				)}
				{enumerate && <th>#</th>}
				{fields.map((field, index) => (
					<th key={index}>{field.replace("_", " ")}</th>
				))}
				{edit && <th>Actions</th>}
			</tr>
		</thead>
	);
}

function Body({ modelData, loading, fields, enumerate, selectable, edit, endpoint }: ModelTableBodyProps) {
	if (loading) {
		return (
			<tbody>
				<tr>
					<td colSpan={100}>
						<Spinner />
					</td>
				</tr>
			</tbody>
		);
	}

	return (
		<tbody>
			{modelData.map((data, index) => (
				<tr key={data.id}>
					{selectable && (
						<td>
							<Checkbox id={data.id} />
						</td>
					)}
					{enumerate && <td>{index + 1}</td>}
					{Object.values(fields).map((key, index) => (
						<td key={index}>{data[key]}</td>
					))}
					{edit && (
						<td>
							<Link href={`users/${data.id}`} className="btn btn-icon w-100 d-inline-flex">
								<Icon name="change" size="sm" />
							</Link>
						</td>
					)}
				</tr>
			))}
		</tbody>
	);
}

export default function ModelTable({
	title,
	fields,
	endpoint,
	selectable,
	enumerate,
	add,
	edit,
	actions,
	variant,
}: ModelTableProps) {
	const [data, setData] = useState<ModelData[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
        console.log(endpoint);
		const fetchData = async () => {
			try {
				const response = await fetch(endpoint);
				const json = await response.json();
				setData(json);
				setLoading(false);
			} catch (error) {
				setError(true);
				setLoading(false);
			}
		};

		fetchData();
	}, [endpoint]);

	return (
		<div className="d-flex flex-column gap-3">
			<div className="d-flex justify-content-between">
				<h2 className="h2">{title}</h2>
				{add && <button className="btn btn-primary">Add</button>}
			</div>
			<Table striped bordered hover variant={variant}>
				<Head fields={fields} enumerate={enumerate} selectable={selectable} edit={edit} />
				<Body
					modelData={data}
					loading={isLoading}
					fields={fields}
					enumerate={enumerate}
					edit={edit}
					selectable={selectable}
					error={error}
					endpoint={endpoint}
				/>
			</Table>
		</div>
	);
}

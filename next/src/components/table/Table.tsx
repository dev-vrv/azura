"use client";

import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "../spinner/Spinner";
import "./Table.scss";
import { Checkbox } from "../fields/Input";
import Link from "next/link";
import Icon from "../Icons/Icons";
import { IEndPoint } from "@/api/endPoints";
import { error } from "console";

interface querySet {
	id: string;
	[key: string]: string;
}

interface ModelTableHeadProps {
	fields: string[];
	enumerate?: boolean;
	selectable?: boolean;
}

interface ModelTableTDProps {
	data: {
		[key: string]: string;
	};
	field: string;
	field_link: string;
}

interface ModelTableBodyProps extends ModelTableHeadProps {
	querySet: querySet[];
	loading: boolean;
	error: boolean;
	endpoint: IEndPoint;
	field_link?: string;
}

interface ModelTableProps {
	endpoint: IEndPoint;
	fields: string[];
	title: string;
	field_link?: string;
	selectable?: boolean;
	enumerate?: boolean;
	add?: boolean;
	actions?: boolean;
	variant?: "dark" | "light";
}

function Head({ fields, enumerate, selectable }: ModelTableHeadProps) {
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
			</tr>
		</thead>
	);
}

function TD({ data, field, field_link }: ModelTableTDProps) {

	if (field === field_link) {
		return (
			<td>
				<Link href={`/admin/users/${data['id']}`}>{data[field]}</Link>
			</td>
		);
	} else {
		return <td>{data[field]}</td>;
	}
}

function Body({ querySet, loading, fields, enumerate, selectable, error, field_link='id' }: ModelTableBodyProps) {
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

	if (error) {
		return (
			<tbody>
				<tr>
					<td colSpan={100}>Error fetching data</td>
				</tr>
			</tbody>
		);
	}

	return (
		<tbody>
			{querySet.map((data, index) => (
				<tr key={data.id}>
					{selectable && (
						<td>
							<Checkbox id={data.id} />
						</td>
					)}
					{enumerate && <td>{index + 1}</td>}
					{Object.values(fields).map((field, index) => (
						<TD key={index} {...{ data: data, field: field, field_link }} />
					))}
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
	actions,
	field_link,
	variant = "dark",
}: ModelTableProps) {
	const [data, setData] = useState<querySet[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(endpoint.path, {
					method: endpoint.method,
					headers: {
						"Content-Type": "application/json",
					},
				});
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
				<Head fields={fields} enumerate={enumerate} selectable={selectable} />
				<Body
					querySet={data}
					loading={isLoading}
					fields={fields}
					enumerate={enumerate}
					selectable={selectable}
					error={error}
					endpoint={endpoint}
					field_link={field_link}
				/>
			</Table>
		</div>
	);
}

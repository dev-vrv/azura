"use client";

import { Checkbox } from "../fields/Input";
import React, { useState, useEffect, useCallback } from "react";
import { Alert, Table } from "react-bootstrap";
import { Button } from "@/components/buttons/Buttons";
import Link from "next/link";
import Icon from "../Icons/Icons";
import Spinner from "../spinner/Spinner";
import "./Table.scss";

interface IData {
	count: number;
	next: null | boolean;
	previous: null | boolean;
	results: any[];
}
interface PropsHead {
	fields: string[];
	enumerate?: boolean;
	selectable?: boolean;
	selectedAll?: boolean;
	onSelectedAll?: (state: boolean) => void;
}
interface PropsBody {
	url: string;
	fields: string[];
	fieldLink?: string;
	enumerate?: boolean;
	selectable?: boolean;
	reload: boolean;
	onReload: (state: boolean) => void;
	selectedAll?: boolean;
	onSelectedAll?: (state: boolean) => void;
}
interface PropsTable {
	fields: string[];
	url: string;
	options?: {
		add?: boolean;
		selectable?: boolean;
		enumerate?: boolean;
		variant?: "dark" | "light";
		title?: string;
	};
}

const dataLoading = (colSpan: number) => {
	return (
		<tr>
			<td colSpan={colSpan}>
				<Spinner />
			</td>
		</tr>
	);
};
const dataError = (colSpan: number) => {
	return (
		<tr>
			<td colSpan={colSpan}>
				<Alert variant="danger">Error loading data</Alert>
			</td>
		</tr>
	);
};
const dataEmpty = (colSpan: number) => {
	return (
		<tr>
			<td colSpan={colSpan}>
				<Alert variant="warning">No data</Alert>
			</td>
		</tr>
	);
};

const THead = ({ fields, enumerate, selectable, selectedAll, onSelectedAll }: PropsHead) => {
	return (
		<thead>
			<tr>
				{selectable && (
					<th>
						<Checkbox
							id="all"
							checked={selectedAll}
							onChecked={(checked: boolean) => {
								{
									onSelectedAll && onSelectedAll(checked);
								}
							}}
						/>
					</th>
				)}
				{enumerate && <th>#</th>}
				{fields.map((field, index) => (
					<th key={index}>{field.replace("_", " ")}</th>
				))}
			</tr>
		</thead>
	);
};
const TBody = ({
	url,
	fields,
	fieldLink,
	enumerate,
	selectable,
	reload,
	onReload,
	selectedAll,
	onSelectedAll,
}: PropsBody) => {
	const [data, setData] = useState<IData | null>(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const handleCheckboxChange = (id: string) => {
		if (selectedRows.includes(id)) {
			setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
		} else {
			setSelectedRows([...selectedRows, id]);
		}
	};

	const handleSelectedAll = useCallback(
		(state: boolean) => {
			if (data?.results) {
				if (state) {
					setSelectedRows(data.results.map((row) => row.id));
				} else if (!state && selectedRows.length === data.results.length) {
					setSelectedRows([]);
				}
			}
		},
		[data?.results, selectedRows.length]
	);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(url);
			const newData = await response.json();
			setData(newData);
			setError(false);
		} catch (err) {
			setError(true);
		} finally {
			setLoading(false);
			onReload(false);
		}
	}, [url, onReload]);

	useEffect(() => {
		if (reload) {
			fetchData();
		}
	}, [reload, fetchData]);

	useEffect(() => {
		if (selectedAll === true || selectedAll === false) {
			handleSelectedAll(selectedAll);
		}
	}, [selectedAll, handleSelectedAll]);

	const resultComponent = () => {
		if (loading) {
			return dataLoading(fields.length + 1);
		}
		if (error) {
			return dataError(fields.length + 1);
		}
		if (data?.results.length === 0) {
			return dataEmpty(fields.length + 1);
		}
		if (data?.results) {
			return (
				<>
					{data?.results.map((row, index) => (
						<tr key={index}>
							{selectable && (
								<td>
									<Checkbox
										id={row.id}
										checked={selectedRows.includes(row.id)}
										onChecked={() => {
											handleCheckboxChange(row.id);
											onSelectedAll && onSelectedAll(false);
										}}
									/>
								</td>
							)}
							{enumerate && <td>{index + 1}</td>}
							{fields.map((field, index) => {
								if (field === fieldLink) {
									return (
										<td key={index}>
											<Link className="link" href={`/admin/users/${row["id"]}`}>
												{row[field]}
											</Link>
										</td>
									);
								}
								return <td key={index}>{row[field]}</td>;
							})}
						</tr>
					))}
				</>
			);
		}
	};

	return <tbody>{resultComponent()}</tbody>;
};
const TModel = (props: PropsTable) => {
	const { options, fields, url } = props;

	const [reload, setReload] = useState(true);
	const [selectedAll, setSelectedAll] = useState(false);

	return (
		<div className="table-model">
			<div className="table-model--header">
				<h3 className="h3">{props.options?.title || ""}</h3>
				<div className="d-flex gap-3">
					{options?.add && <Button icon={{ name: "plus", size: "xl" }}></Button>}
					<Button icon={{ name: "redo", size: "xl" }} onClick={() => setReload(true)}></Button>
				</div>
			</div>
			<div className="table-model--body">
				<Table striped bordered hover variant={options?.variant || "dark"}>
					<THead
						fields={fields}
						enumerate={options?.enumerate}
						selectable={options?.selectable}
						selectedAll={selectedAll}
						onSelectedAll={setSelectedAll}
					/>
					<TBody
						url={url}
						fields={fields}
						fieldLink="email"
						enumerate={options?.enumerate}
						selectable={options?.selectable}
						reload={reload}
						onReload={setReload}
						selectedAll={selectedAll}
						onSelectedAll={setSelectedAll}
					/>
				</Table>
			</div>
			<div className="table-model--footer"></div>
		</div>
	);
};

export default TModel;

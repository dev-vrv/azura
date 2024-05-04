"use client";

import { Checkbox } from "../fields/Input";
import React, { forwardRef, useImperativeHandle, useState, useEffect, useCallback, useRef } from "react";
import { Alert, Table } from "react-bootstrap";
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
}
interface PropsBody {
	url: string;
	fields: string[];

	fieldLink?: string;
	enumerate?: boolean;
	selectable?: boolean;

	reload: boolean;
	onReload: (state: boolean) => void;
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

const THead = (props: PropsHead) => {
	const { fields, enumerate, selectable } = props;
	return (
		<thead>
			<tr>
				{selectable && (
					<th>
						<Checkbox id="all" onChecked={(checked: boolean) => {
							console.log(checked);
						}} />
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
const TBody = (props: PropsBody) => {
	const { url, fields, fieldLink, enumerate, selectable, reload, onReload } = props;
	const [data, setData] = useState<IData | null>(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

	const loadingData = () => {
		return (
			<tr>
				<td colSpan={fields.length + 1}>
					<Spinner />
				</td>
			</tr>
		);
	}
	const errorData = () => {
		return (
			<tr>
				<td colSpan={fields.length + 1}>
					<Alert variant="danger">Error loading data</Alert>
				</td>
			</tr>
		);
	}
	const noData = () => {
		return (
			<tr>
				<td colSpan={fields.length + 1}>
					<Alert variant="warning">No data</Alert>
				</td>
			</tr>
		);
	}
	const resultData = () => {
		return (
			<>
				{data?.results.map((row, index) => (
					<tr key={index}>
						{selectable && (
							<td>
								<Checkbox id={row.id} />
							</td>
						)}
						{enumerate && <td>{index + 1}</td>}
						{fields.map((field, index) => {
							if (field === fieldLink) {
								return (
									<td key={index}>
										<Link className="link" href={`/admin/users/${row['id']}`}>
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
	const resultComponent = () => {
		if (loading) {
			return loadingData();
		}
		if (error) {
			return errorData();
		}
		if (data?.results.length === 0) {
			return noData();
		}
		if (data?.results) {
			return resultData();
		}
	}

	return (
		<tbody>
			{resultComponent()}
		</tbody>
	);

};

function TModel(props: PropsTable) {
	const { options, fields, url } = props;

	const [reload, setReload] = useState(true);
	const [selectedAll, setSelectedAll] = useState(false);
	
	return (
		<div className="table-model">
			<div className="table-model--header">
				<h3 className="h3">{props.options?.title || ""}</h3>
				<div className="d-flex gap-3">
					<button type="button" className="btn btn-icon" onClick={() => setReload(true)}>
						<Icon name="redo" size="xl" />
					</button>
					{options?.add && (
						<button type="button" className="btn btn-icon">
							<Icon name="plus" size="xl" />
						</button>
					)}
				</div>
			</div>
			<div className="table-model--body">
				<Table striped bordered hover variant={options?.variant || "dark"}>
					<THead fields={fields} enumerate={options?.enumerate} selectable={options?.selectable} />
					<TBody
						url={url}
						fields={fields}
						fieldLink="email"
						enumerate={options?.enumerate}
						selectable={options?.selectable}
						reload={reload}
						onReload={setReload}
					/>
				</Table>
			</div>
			<div className="table-model--footer"></div>
		</div>
	);
}

export default TModel;

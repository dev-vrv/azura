"use client";

import "./Table.scss";
import { Context } from "@/context/context";
import { Spinner } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import Table from "react-bootstrap/Table";
import Link from "next/link";

interface IResponseList {
	count: number;
	next: string;
	previous: string;
	results: { [key: string]: any }[];
}

interface PropsTableHead {
	fields: string[];
	selectable?: boolean;
}
const THead = ({ fields, selectable }: PropsTableHead) => {
	return (
		<thead>
			<tr>
				{selectable && (
					<th className="text-center">
						<input type="checkbox" />
					</th>
				)}
				{fields.map((field, index) => {
					return (
						<th className="text-center" key={index}>
							{field.replace("_", " ")}
						</th>
					);
				})}
			</tr>
		</thead>
	);
};

interface PropsTableBody {
	fields: string[];
	endPointTable: string;
	selectable?: boolean;
	fieldLink?: string;
	appName?: string;
}
const TBody = ({ fields, selectable, endPointTable, fieldLink, appName }: PropsTableBody) => {
	const [items, setItems] = useState<IResponseList>();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await fetch(endPointTable);
				const data = await response.json();
				setItems(data);
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchItems();
	}, [endPointTable]);

	return (
		<tbody>
			{loading && (
				<td className="text-center" colSpan={fields.length + 1}>
					<p className="py-2">
						<Spinner variant="primary" className="d-inline-flex bg-none" />
					</p>
				</td>
			)}
			{error && (
				<tr>
					<td colSpan={fields.length + 1}>Error</td>
				</tr>
			)}
			{items &&
				items.results.map((item, index) => {
					return (
						<tr key={index}>
							{selectable && (
								<td className="text-center">
									<input type="checkbox" />
								</td>
							)}
							<TDItem item={item} fields={fields} fieldLink={fieldLink} appName={appName} />
						</tr>
					);
				})}
		</tbody>
	);
};

interface PropsTDItem {
	item: { [key: string]: any };
	appName: string;
	fields: string[];
	fieldLink?: string;
}
const TDItem = ({ item, fields, fieldLink, appName }: PropsTDItem) => {
	return (
		<>
			{fields.map((field, index) => {
				return (
					<td key={index}>
						{field === fieldLink ? (
							<Link href={`${appName}/form/${item.id}`} className="link">
								{item[field]}
							</Link>
						) : (
							item[field]
						)}
					</td>
				);
			})}
		</>
	);
};

export default function AppTable() {
	const { context } = useContext(Context);
	const pathname = usePathname();
	const appName = context.apps ? Object.keys(context.apps).find((app) => pathname.includes(app)) : null;

	// loading
	if (!context.apps || Object.keys(context.apps).length === 0) {
		return (
			<div className="d-flex justify-content-center align-items-center w-100 h-100">
				<Spinner variant="primary" />
			</div>
		);
	}
	// not found
	else if (!appName && Object.keys(context.apps).length > 0) {
		return (
			<div className="d-flex justify-content-center align-items-center w-100 h-100">
				<h4>404 | Not Found</h4>
			</div>
		);
	}
	// found
	else if (appName && Object.keys(context.apps).length > 0) {
		const urlTable = context.api.url + context.apps[appName].get_objects.url;
		const urlForm = context.api.url + context.apps[appName].get_form_object.url;
		const fields = context.apps[appName].display_fields;
		return (
			<div className="w-100 h-100 d-flex flex-column gap-3">
				<div className="d-flex justify-content-between">
					<h3 className="text-capitalize">{}</h3>
					<button className="btn btn-primary">Add</button>
				</div>
				<div className="h-100 overflow-y-scroll pe-2">
					<Table striped bordered hover size="sm">
						<THead selectable fields={context.apps[appName].display_fields} />
						<TBody
							appName={appName}
							selectable
							fields={fields}
							fieldLink={context.apps[appName].display_link}
							endPointTable={urlTable}
						/>
					</Table>
				</div>
			</div>
		);
	}
}

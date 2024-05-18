"use client";

import "./Table.scss";
import { Context } from "@/context/context";
import { Spinner } from "react-bootstrap";
import { useState, useEffect, useContext, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Link from "next/link";
import Icon from "@/components/icons/Icon";

interface IResponse {
	count: number;
	next: string;
	previous: string;
}
interface IResponseList extends IResponse {
	results: { [key: string]: any }[];
}
interface PropsTableHead {
	fields: string[];
	selectable?: boolean;
}
interface PropsTableBody {
	fields: string[];
	endPointTable: string;
	appName: string;
	selectable?: boolean;
	fieldLink?: string;
	reload: boolean;
	setReload: (reload: boolean) => void;
	setItemsInfo: (itemsInfo: IResponse) => void;
}
interface PropsTDItem {
	item: { [key: string]: any };
	appName: string;
	fields: string[];
	fieldLink?: string;
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
const TBody = ({ fields, selectable, endPointTable, fieldLink, appName, reload, setReload, setItemsInfo }: PropsTableBody) => {
	const [items, setItems] = useState<IResponseList>();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const fetchItems = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(endPointTable);
			const data = await response.json();
			setItems(data);
			
			setItemsInfo({
				next: data.next,
				previous: data.previous,
				count: data.count
			})
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}, [endPointTable, setItemsInfo]);
	
	useEffect(() => {
		if (reload) {
			fetchItems();
			setReload(false);
		}
	}, [fetchItems, setReload, reload]);

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
			{!loading && items &&
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
			{items?.results.length === 0 && (
				<tr>
					<td colSpan={fields.length + 1}>No data</td>
				</tr>
			)}
		</tbody>
	);
};

const TDItem = ({ item, fields, fieldLink, appName }: PropsTDItem) => {
	return (
		<>
			{fields.map((field, index) => {
				return (
					<td key={index}>
						{field === fieldLink ? (
							<Link href={`${appName}/change/${item.id}`} className="link">
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
	const [ reload, setReload ] = useState(true);
	const [ itemsInfo, setItemsInfo ] = useState<IResponse>({ count: 0, next: "", previous: "" });
	const pathname = usePathname();
	const appName = context.apps ? Object.keys(context.apps).find((app) => pathname.includes(app)) : null;
	
	let currentPage = null;
	let pagesCount = null;
	if (itemsInfo && itemsInfo.next && itemsInfo.count > 0) {
		currentPage = Number(new URL(itemsInfo.next).searchParams.get('page')) - 1
		pagesCount = Math.ceil(itemsInfo.count / 50)
	}

	// found
	if (appName && Object.keys(context.apps).length > 0) {
		const urlTable = context.api.url + context.apps[appName].get_objects.url;
		const urlForm = context.api.url + context.apps[appName].get_form_object.url;
		const fields = context.apps[appName].display_fields;
		return (
			<div className="w-100 h-100 d-flex flex-column gap-2">
				<div className="d-flex justify-content-between align-items-center">
					<h3 className="text-capitalize">{appName}</h3>
					<div className="actions d-flex align-items-center">
						<Button variant="icon" onClick={() => setReload(true)}>
							<Icon name="redo" size="3" />
						</Button>
						<Button variant="icon">
							<Icon name="plus" size="3" />
						</Button>
					</div>
				</div>
				<div className="table-wrapper pe-2">
					<Table striped bordered hover size="sm">
						<THead selectable fields={context.apps[appName].display_fields} />
						<TBody
							setItemsInfo={setItemsInfo}
							reload={reload}
							setReload={setReload}
							appName={appName}
							selectable
							fields={fields}
							fieldLink={context.apps[appName].display_link}
							endPointTable={urlTable}
						/>
					</Table>
				</div>
				<div className="d-flex align-items-center justify-content-between">
					<div className="">
						{itemsInfo.count > 0 && (
							<p className="text-muted">All: {itemsInfo.count}</p>
						)}
					</div>
					<div className="d-flex align-items-center">
						{currentPage && pagesCount ? (
							<>
								<p>Page: {currentPage}</p>
								<Button variant="icon">
									<Icon name="left" size="3" />
								</Button>
								<Button variant="icon">
									<Icon name="right" size="3" />
								</Button>
								<p>pages: {pagesCount}</p>
							</>
						) : (
							""
						)}
					</div>
					<div className=""></div>
				</div>
			</div>
		);
	}
	// loading
	else if (!context.apps || Object.keys(context.apps).length === 0) {
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

}

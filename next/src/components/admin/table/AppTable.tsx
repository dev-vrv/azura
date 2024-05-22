"use client";

import "./AppTable.scss";
import { Context } from "@/context/context";
import { Spinner } from "react-bootstrap";
import { useState, useEffect, useContext, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Button, FormControl } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Link from "next/link";
import Icon from "@/components/icons/Icon";
import Form from 'react-bootstrap/Form';


interface PropsAppTable {
	appName: string;
	selectable?: boolean;
}

interface IResponse {
	count: number;
	next: string;
	previous: string;
	results: any[];
}

export default function AppTable({ appName, selectable }: PropsAppTable) {
	const { context } = useContext(Context);
	const [data, setData] = useState<IResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	

	const FetchData = useCallback(async () => {
		setError(false);
		const action = context.apps[appName]['retrieve_list']['action'];
		try {
			const url = `${context.api.url}${appName}/${action}/`;
			const res = await fetch(url);
			const data = await res.json();
			setData(data);
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}, [appName, context]);

	useEffect(() => {
		if (loading && context.apps && Object.keys(context.apps).length > 0) {
			FetchData();
		}
	}, [context, FetchData, loading]);

	const displayFields: string[] = context.apps[appName].display_fields;
	const displayLink: string = context.apps[appName].display_link;
	
	const THead = () => {
		return (
			<thead>
				<tr>
				{selectable && (
					<th>
						<Form.Check />
					</th>
				)}
				{displayFields.map((field, index) => (
					<th className="text-capitalize" key={index}>
						<span>{field.replace('_', ' ')}</span>
					</th>
				))}
				</tr>
			</thead>
		);
	};

	const TBody = () => {
		const DisplayValue = ({value}:{value: string | boolean}) => {
			if (typeof value === 'boolean') {
				return <Icon name={`${value === true? 'check' : 'checkNo'}`} variant={`${value === true? 'success' : 'danger'}`} />;
			}
			else {
				return value || '-';
			}
		}

		return (
			<tbody>
				{data && data.results.length > 0 && !loading && !error && data.results.map((item, index) => (
					<tr key={index}>
						{selectable && (
							<td>
								<Form.Check />
							</td>
						)}
						{displayFields.map((field, index) => (
							<td key={index}>
								{displayLink === field ? (
									<Link href={`/admin/${appName}/${item.id}`}>
										<DisplayValue value={item[field]} />
									</Link>
								) : <DisplayValue value={item[field]} />}
							</td>
						))}
					</tr>
				))}
				{data && data.results.length === 0 && !loading && !error && (
					<tr>
						<td colSpan={100} className="text-center">
							<p>No data available</p>
						</td>
					</tr>
				)}
				{loading && (
					<tr>
						<td colSpan={100} className="text-center">
							<Spinner animation="grow" />
						</td>
					</tr>
				)}
				{error && (
					<tr>
						<td colSpan={100} className="text-center">
							<p className="d-inline-flex align-items-center gap-1">
								<Icon name="alert" variant="danger" size={5} />
								<span>Error loading data</span>
							</p>
						</td>
					</tr>
				)}
			</tbody>
		);
	};
 
	return (
		<div className="app-table">
			<div className="d-flex justify-content-between align-items-center">
				<h4 className="text-capitalize">{appName}</h4>
				<div className="d-flex">
					<Button variant="icon" onClick={() => setLoading(true)}>
						<Icon name="redo" size={3} />
					</Button>
					<Button variant="icon">
						<Icon name="plus" size={3} />
					</Button>
				</div>
			</div>
			<Table striped bordered hover responsive>
				<THead />
				<TBody />
			</Table>
		</div>
	);
}

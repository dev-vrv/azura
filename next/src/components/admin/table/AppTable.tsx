"use client";

import "./AppTable.scss";
import { Context } from "@/context/context";
import { Spinner } from "react-bootstrap";
import { useState, useEffect, useContext, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Button, Form, FormControl, Table } from "react-bootstrap";

import Icon from "@/components/icons/Icon";

interface IRestPaginationList {
	count: number;
	next: string;
	previous: string;
	results: any[];
}


export interface ITableEndpoint {
	url: string;
	method: string;
	fields_display: string[];
	field_links: string[];
}

export interface ITable {
	appName: string;
	endPoint: ITableEndpoint;
}

export default function AppTable({ appName, endPoint }: ITable) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState<IRestPaginationList | null>(null);

	useEffect(() => {
		fetch(endPoint.url)
		.then((res) => res.json())
		.then((data) => {
			setData(data);
			setLoading(false);
		})
		.catch((err) => {
			setError(true);
			setLoading(false);
		});
	}, [appName, endPoint]);

	const THead = () => {
		return (
			<thead>
				<tr>
					<th>
						<Form.Check />
					</th>
					{endPoint.fields_display.map((field, index) => (
						<th key={index}>{field.replace('_', ' ')}</th>
					))}
				</tr>
			</thead>
		)
	}

	const TBody = () => {

		const TR = ({row}: {row: {[key:string]: string | number | boolean}}) => {
			return (
				<tr>
					<td>
						<Form.Check />
					</td>
					{
						endPoint.fields_display.map((field, index) => {
							if (typeof row[field] === 'boolean') {
								return (
									<td key={index}>
										<Icon 
											name={!row[field] ? 'check' : 'notCheck'}
											variant={!row[field] ? 'success' : 'danger'}
											size={5}
										/>
									</td>
								)
							}
							else {
								return (
									<td key={index}>
										{row[field]}
									</td>
								)
							}
						})
					}
				</tr>
			)
		}

		return (
			<tbody>
				{data && data.results.length && data.results.map((row, index) => (
					<TR key={index} row={row} />
				))}
				{data && !data.results.length && (
					<tr>
						<td colSpan={endPoint.fields_display.length + 1}>
							<p>No data</p>
						</td>
					</tr>
				)}
				{loading && (
					<tr>
						<td colSpan={endPoint.fields_display.length + 1}>
							<Spinner animation="grow" role="status" />
						</td>
					</tr>
				)}
				{error && (
					<tr>
						<td colSpan={endPoint.fields_display.length + 1}>
							<p>Error</p>
						</td>
					</tr>
				)}
			</tbody>
		)
	}

	return (
		<div className="app-table">
			<div className="d-flex justify-content-between align-items-center">
				<h4 className="text-capitalize">{''}</h4>
				<div className="d-flex">
					<Button variant="icon" onClick={() => {}}>
						<Icon name="redo" size={3} />
					</Button>
					<Button variant="icon">
						<Icon name="plus" size={3} />
					</Button>
				</div>
			</div>
			<div className="">
				<Table>
					<THead />
					<TBody />
				</Table>
			</div>
		</div>
	);
}

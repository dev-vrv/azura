"use client";

import { FormSearch } from "@/components/forms/Forms";
import { CiCirclePlus, CiFilter, CiRedo } from "react-icons/ci";
import Table from "react-bootstrap/Table";
import CheckBox from "../checkbox/CheckBox";
import Spinner from "../spinner/Spinner";
import Alert from "../alerts/Alert";
import React, { useEffect, useState, useCallback } from "react";
import Dialog from "../dialog/Dialog";

import axios from "axios";
import "./Table.scss";

type ModelActions = {
	add?: boolean;
	filter?: boolean;
	refresh?: boolean;
	search?: boolean;
};

interface TableProps {
	listDisplay: string[];
	endPoint: {
		url: string;
		data?: {
			[key: string]: string;
		};
	};
	selectable?: boolean;
	enumerate?: boolean;
	actions?: ModelActions;
	name?: string;
	refreshFlag?: boolean;
}

function ModelView(props: TableProps) {
	const [refreshFlag, setRefreshFlag] = useState(false);

	const [modalShow, setModalShow] = React.useState(false);


	const triggerRefresh = () => {
		setRefreshFlag((prev) => !prev);
	};

	const actions: ModelActions = {
		add: true,
		refresh: true,
		filter: false,
		search: false,
	};

	const actionButtons = (): React.ReactNode => {
		if (props.actions) {
			for (let key in props.actions) {
				actions[key as keyof typeof actions] = props.actions[key as keyof typeof props.actions];
			}
		}
		return (
			<>
				{actions.search && <FormSearch />}
				{actions.filter && (
					<button className="btn btn-secondary" type="button">
						<span>Filter</span>
						<i>
							<CiFilter />
						</i>
					</button>
				)}
				{actions.add && (
					<>
						<button className="btn btn-success" type="button" onClick={() => setModalShow(true)}>
							<span>Add</span>
							<i>
								<CiCirclePlus />
							</i>
						</button>
						<Dialog {...{
							title:"Add User",
							id:"add-user",
							show: modalShow,
							onHide: () => setModalShow(false),
						}}> 
							<div>
								<FormSearch />
							</div>
						</Dialog>

					</>
				)}

				{actions.refresh && (
					<button className="btn btn-success" type="button" onClick={() => triggerRefresh()}>
						<i>
							<CiRedo />
						</i>
					</button>
				)}
			</>
		);
	};

	return (
		<>
			<div className="row section-model__header">
				<div className="col">
					<h3 className="h3">{props.name}</h3>
				</div>
				<div className="col d-flex justify-content-end gap-4">{actionButtons()}</div>
			</div>
			<div className="row section-model__body">
				<ModelTable {...props} refreshFlag={refreshFlag} />
			</div>
			<div className="row section-model__footer"></div>
		</>
	);
}

function ModelTable(props: TableProps) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const fetchData = useCallback(() => {
		setLoading(true);
		setError("");
		axios
			.get(props.endPoint.url, { params: props.endPoint.data })
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [props.endPoint]);

	useEffect(() => {
		fetchData();
	}, [fetchData, props.refreshFlag]);

	return (
		<Table responsive>
			<thead>
				<tr>
					{props.enumerate && <th>#</th>}
					{props.selectable && (
						<th>
							<CheckBox id="all" />
						</th>
					)}
					{props.listDisplay.map((item, index) => (
						<th key={index}>{item.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{loading && (
					<tr>
						<td colSpan={props.listDisplay.length + (props.selectable ? 1 : 0) + (props.enumerate ? 1 : 0)}>
							<Spinner />
						</td>
					</tr>
				)}
				{error && (
					<tr>
						<td colSpan={props.listDisplay.length + (props.selectable ? 1 : 0) + (props.enumerate ? 1 : 0)}>
							<Alert type="danger" heading={error} />
						</td>
					</tr>
				)}
				{!loading &&
					!error &&
					data.length > 0 &&
					data.map((item, index) => (
						<tr key={index}>
							{props.enumerate && <td>{index + 1}</td>}
							{props.selectable && (
								<td>
									<CheckBox id={index.toString()} />
								</td>
							)}
							{props.listDisplay.map((key, idx) => (
								<td key={idx}>{item[key] || "--"}</td>
							))}
						</tr>
					))}
			</tbody>
		</Table>
	);
}

export default ModelView;

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import './Table.scss';
import CheckBox from "../checkbox/CheckBox";
import { CiEdit, CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

interface ResponseData {
	id: string;
	[key: string]: string | number | boolean | null;
}

interface PropsTableData {
	endPoint: {
		url: string;
		method: string;
		data?: any;
	};
	sort?: string[] | boolean;
	select?: boolean;
	listDisplay: string[]
	listDisplayLink?: string;
}


const Spin = () => {
	return (
		<tr>
			<td colSpan={100}>
				<Spinner />
			</td>
		</tr>
	);
}

const TH = ({ listDisplay, sort }: { listDisplay: string[], sort?: string[] | boolean }) => {
	return (
		<>
			{listDisplay.map((label, index) => {
				label = label.replace('_', ' ');
				label = label.charAt(0).toUpperCase() + label.slice(1);

				const sortLabel = () => {
					return (
						<p className="d-inline-flex flex-column align-items-center gap-1">
							<span className="d-inline-flex">
								<a className="btn btn-sort" href={`${label}-asc`}>
									<i>
										<CiCircleChevUp />
									</i>
								</a>
								<a className="btn btn-sort" href={`${label}-desc`}>
								<i>
									<CiCircleChevDown />
								</i>
								</a>
							</span>
							<span>{label}</span>
						</p>
					);
				}
				return (
					<th key={index}>
						{sort == true || (sort && sort.includes(label.toLowerCase())) ? sortLabel() : label} 
					</th>
				);
			})}
		</>
	);
};


export default function TableData({endPoint, listDisplay, sort, select, listDisplayLink = 'id'}: PropsTableData) {

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios({
			url: endPoint.url,
			method: endPoint.method,
			data: endPoint.data
		})
		.then((response) => {
			setData(response.data);
			setLoading(false);
		})
		.catch((error) => {
			console.log(error);
		});
	}, [endPoint]);


	const DataView = (data: ResponseData[]) => {
		if (data) {
			return data.map((item, index) => {
				return (
					<tr key={index}>
						{select && <td>
							<p className="td-content">
							<CheckBox id={item.id} />
							</p>
							</td>}
						{listDisplay.map((key, index) => {
							return (
								<td key={index}>
									<p className="td-content">
										{key == listDisplayLink ? (
											<a href={item.id} className="link">
												{item[key]}
											</a>
										) : (
											<span>{item[key]}</span>
										)}
									</p>
								</td>
							);
						})}
					</tr>
				);
			});
		}
		return (
			<tr>
				<td colSpan={100}></td>
			</tr>
		);
	}


	return (
		<table className="table">
			<thead>
				<tr>
					{select && <th><CheckBox id="all" /></th>}
					<TH listDisplay={listDisplay} sort={sort} />
				</tr>
			</thead>
			<tbody>{loading ? <Spin /> : DataView(data)}</tbody>
		</table>
	);
}
"use client";

import { Checkbox } from "@/components/inputs/Inputs";
import { Alert } from "react-bootstrap";
import React, { useState, useEffect, useCallback } from "react";
import Spinner from "@/components/spinner/Spinner";
import Link from "next/link";

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
				<Alert variant="danger">Error</Alert>
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

interface IData {
	count: number;
	next: null | boolean;
	previous: null | boolean;
	results: any[];
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

        if (selectedRows.length === data?.results.length) {
            onSelectedAll && onSelectedAll(true);
        } else {
            onSelectedAll && onSelectedAll(false);
        }
	};

	const handleSelectedAll = useCallback(
		(state: boolean) => {
			if (data?.results) {
                if (state) {
                    setSelectedRows(data.results.map((row) => row.id));
                }
                else {
                    setSelectedRows([]);
                }
			}
		},
		[data?.results]
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

export default TBody;
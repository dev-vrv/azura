"use client";

import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Button } from "@/components/buttons/Buttons";
import THead from "./components/Head";
import TBody from "./components/Body";
import "./Table.scss";

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

const TModel = ({ options, fields, url }: PropsTable) => {
	const [reload, setReload] = useState(true);
	const [selectedAll, setSelectedAll] = useState(false);

	return (
		<div className="table-model">
			<div className="table-model--header">
				<h3 className="h3">{options?.title || ""}</h3>
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

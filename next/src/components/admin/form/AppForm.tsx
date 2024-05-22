"use client";

import { Context } from "@/context/context";
import { Spinner } from "react-bootstrap";
import { useState, useEffect, useContext, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button, FormControl } from "react-bootstrap";
import Link from "next/link";
import Icon from "@/components/icons/Icon";
import Form from "react-bootstrap/Form";

interface PropsAppForm {
	appName: string;
	id: string;
}

interface IResponse {
	[key: string]: any;
}

interface IField {
	name: string;
	type: string;
	required: boolean;
	label: string;
	help_text: string;
	value: any;
	options: any;
}

export default function AppForm({ appName, id }: PropsAppForm) {
	const { context } = useContext(Context);
	const [data, setData] = useState<IResponse | null>(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const FetchData = useCallback(async () => {
		setError(false);
		const action = context.apps[appName]["retrieve_form"]["action"];
		try {
			const url = `${context.api.url}${appName}/${id}/${action}/`;
			const res = await fetch(url);
			const data = await res.json();
			setData(data);
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}, [appName, context, id]);

	useEffect(() => {
		if (loading && context.apps && Object.keys(context.apps).length > 0) {
			FetchData();
		}
	}, [context, FetchData, loading]);

	const FieldView = ({ field }: { field: IField }) => {
		if (field.type === "boolean") {
			return (
				<Form.Check id={field.name} name={field.name} type="switch" label={field.label} checked={field.value} />
			);
		} else if (field.type === "text") {
			return <FormControl type="text" placeholder={field.label} value={field.value} />;
		}
		return <div className=""></div>;
	};

	return (
		<div className="app-form h-100 d-flex justify-content-center align-items-center">
			{data && (
				<Form className="w-100 h-100 d-flex flex-column justify-content-between gap-2">
					<div className="d-flex justify-content-between">
						<div className="d-flex align-items-center">
							<Button variant="icon" onClick={() => router.push(`/admin/${appName}`)}>
								<Icon name="left" size={4}></Icon>
							</Button>
							<h4 className="text-capitalize">{appName}</h4>
						</div>
					</div>
					<div className="h-100 d-flex flex-column gap-2">
						{data.map((field: IField, index: number) => {
							return <FieldView field={field} key={index} />;
						})}
					</div>
					<div className="d-flex gap-2">
						<Button variant="secondary" type="submit">
							Cancel
						</Button>
						<Button variant="primary" type="submit">
							Save
						</Button>
					</div>
				</Form>
			)}
			{loading && <Spinner animation="grow" />}
			{error && <div>Error</div>}
		</div>
	);
}

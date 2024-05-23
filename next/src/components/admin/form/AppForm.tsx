"use client";

import { Context } from "@/context/context";
import { Spinner } from "react-bootstrap";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button, FormControl, Row, Col, Container } from "react-bootstrap";
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
	readonly: boolean;
}

const FieldView = ({ field }: { field: IField }) => {
	const inputRef = useRef(null);
	const handleChange = (e: any) => {
		e.target.focus();
	};

	const props = {
		id: field.name,
		name: field.name,
		label: field.label,
		readOnly: field.readonly,
		disabled: field.readonly,
	};

	if (field.type === "boolean") {
		return (
			<Form.Check type="switch" ref={inputRef} onChange={handleChange} defaultChecked={field.value} {...props} />
		);
	} else if (field.type === "select") {
	} else {
		return (
			<>
				<Form.Label className="text-capitalize text-muted" htmlFor={field.name}>{field.label}</Form.Label>
				<Form.Control
					type={field.type}
					ref={inputRef}
					onChange={handleChange}
					defaultValue={field.value}
					{...props}
				/>
			</>
		);
	}
};

export default function AppForm({ appName, id }: PropsAppForm) {
	const { context } = useContext(Context);
	const [inputsValues, setInputsValues] = useState<{ [key: string]: any }>({});
	const [data, setData] = useState<IResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
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
		loading && FetchData();
	}, [context, FetchData, loading]);

	useEffect(() => {
		if (data) {
			const inputs: { [key: string]: any } = {};
			data.forEach((field: IField) => {
				inputs[field.name] = field.value || undefined;
			});
			setInputsValues(inputs);
		}
	}, [data]);

	const makeGroups = (): { [key: string]: any }[] => {
		const formGroups = context.apps[appName]["form_groups"];
		const groups: any = {};
		if (formGroups && data) {
			formGroups.forEach((group: any) => {
				groups[group.name] = data.filter((field: IField) => group.fields.includes(field.name));
			});
		}
		return groups;
	};
	const groups = makeGroups();
	console.log(context.apps[appName]);
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
					<Container fluid className="h-100 d-flex flex-wrap gap-2 overflow-y-scroll">
						<Row className="w-100 g-2">
							{Object.keys(groups).map((groupName: any, index: number) => (
								<Col
									xs={6}
									className="d-flex flex-column justify-content-start h-auto gap-2"
									key={index}
								>
									<h5 className="text-capitalize">{groupName.replace('_', ' ')}</h5>
									{context.apps[appName]['form_groups'].map((group: any) => {
										if (group.name === groupName) {
											return (
												<p key={group.name} className="text-capitalize text-muted">{group.description}</p>
											);
										}
									})}
									{groups[groupName].map((field: IField, index: number) => (
										<div className="w-100 py-1 px-1" key={index}>
											<FieldView field={field} />
										</div>
									))}
								</Col>
							))}
						</Row>
					</Container>
					<div className="d-flex justify-content-end gap-2">
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

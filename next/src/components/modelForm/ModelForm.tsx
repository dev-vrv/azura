"use client";

import "./ModelForm.scss";

import MField from "./components/ModelFields";
import Group from "./components/ModelGroup";
import { IGroup, IFields } from "./components/ModelGroup";
import { useState, useCallback, useEffect, useContext } from "react";
import { IEndPoint } from "@/api/endPoints";
import { Button } from "@/components/buttons/Buttons";
import Spinner from "@/components/spinner/Spinner";
import { AppContext } from "@/context/AppContext";
import { INotification } from "@/context/AppContext";
import AlertView from "../alert/AlertView";
import { PropsAlertView } from "../alert/AlertView";
import { text } from "stream/consumers";


interface PropsForm {
	objectId: number;
	fields: IFields;
	formTitle: string;
	groups?: IGroup[];
	endPointUpdate?: IEndPoint;
	endPointCreate?: IEndPoint;
	endPointDelete?: IEndPoint;
	back?: () => void;
}

interface PropsFields {
	fields: IFields;
	groups?: IGroup[];
	handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface PropsHeader {
	formTitle: string;
	alerts?: PropsAlertView[];
	back?: () => void;
	handleDelete?: () => void;
	endPointDelete?: IEndPoint;
}

interface FormValues {
	[key: string]: string | boolean | { [key: string]: string[] };
}


const MFields = ({groups, fields, handleChange}: PropsFields) => {
	const GroupedFields = () => {
		return groups?.map((group) => {
			return (
				<Group
					key={group.title}
					fields={group.fields}
					fieldsNames={group.fieldsNames}
					title={group.title}
					description={group.description}
					colSize={group.colSize}
					rowSize={group.rowSize}
					handleChange={handleChange}
				/>
			);
		});
	}
	const NotGroupedFields = () => {
		return Object.keys(fields).map((key) => {
			return (
				<div className="col-6" key={key}>
					<MField
						id={key}
						type={fields[key].type}
						value={fields[key].value as string}
						required={fields[key].required}
						readOnly={fields[key].readOnly}
						handleChange={handleChange}
					/>
				</div>
			);
		});
	}

	if (groups) {
		return <GroupedFields />;
	}
	else {
		return <NotGroupedFields />;
	}
}

const MHeader = ({formTitle, back, handleDelete, endPointDelete, alerts}: PropsHeader) => {
	return (
		<div className="model-form--header">
			<div className="w-100 d-flex justify-content-between">
				<div className="d-flex align-items-center gap-2">
					{back && <Button icon={{ name: "left", size: "xl" }} onClick={back}></Button>}
					<h4 className="h4">{formTitle ? formTitle : "Form"}</h4>
				</div>
				{endPointDelete && (
					<Button
						variant="danger"
						icon={{ name: "trash" }}
						confirm={true}
						confirmTitle={`Delete ${formTitle}`}
						confirmText={`Are you sure you want to delete ${formTitle}?`}
						onClick={handleDelete}
					>
						<span>Delete</span>
					</Button>
				)}
			</div>
			<div className="d-flex flex-column gap-2">
			{alerts && alerts.map((alert: PropsAlertView, index) => (
				<AlertView key={index} type={alert.type} text={alert.text} />
			))}
			</div>
		</div>
	)
}

const MForm = ({ fields, groups, back, endPointUpdate, endPointDelete, endPointCreate, formTitle, objectId }: PropsForm) => {
	const [formValues, setFormValues] = useState<FormValues>({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [alerts, setAlerts] = useState<PropsAlertView[]>([]);
	const { notifications, setNotifications } = useContext(AppContext);
	
	const initialFormValues = useCallback(() => {
		const values: FormValues = {};
		Object.keys(fields).forEach((key) => {
			values[key] = fields[key].value;
		});
		setFormValues(values);
	}, [fields]);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(endPointUpdate?.path as string, {
				method: endPointUpdate?.method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formValues),
			});
			console.log(response);
			const newData = await response.json();
		} catch (err: any) {
			console.log(err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [endPointUpdate, formValues]);

	const handleDelete = useCallback(async () => {
		try {
			const response = await fetch(`${endPointDelete?.path}${objectId}`, {
				method: endPointDelete?.method,
			});
			const newData = await response.json();
		} 
		catch (err: any) {
			setError(err);
		}
		if (!error) {
			setNotifications([
				{
					id: Math.floor(Math.random() * 1000),
					duration: 5000,
					type: "danger",
					seen: false,
					message: `${formTitle} has been deleted`,
					createdAt: new Date(),
				},
				...notifications,
			]);
		}
		back && back();
	}, [endPointDelete, objectId, back, setNotifications, formTitle, notifications, error]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked, type } = event.target;
		setFormValues({
			...formValues,
			[name]: type === "checkbox" ? checked : value,
		});
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		fetchData();
	}

	const handleAlerts = useCallback(() => {
		console.log("handleAlerts");
	}, []);

	useEffect(() => {
		initialFormValues();
	}, [initialFormValues]);

	return (
		<form
			className={`model-form ${loading ? "loading" : ""}${error ? "error" : ""}`}
			onSubmit={(e) => handleSubmit(e)}
		>

			<MHeader formTitle={formTitle} back={back} handleDelete={handleDelete} endPointDelete={endPointDelete} />

			<div className="model-form--body">
				<div className="row g-3">
					<MFields groups={groups} fields={fields} handleChange={handleChange} />
				</div>
			</div>
			<div className="model-form--footer">
				{back && (
					<Button variant="secondary" onClick={back}>
						Cancel
					</Button>
				)}
				<Button type="submit" variant="primary" disabled={loading}>
					{loading ? (
						<>
							<span>Saving</span>
							<Spinner size="sm" color="light" type="inline" />
						</>
					) : (
						"Save"
					)}
				</Button>
			</div>
		</form>
	);
}

export default MForm;

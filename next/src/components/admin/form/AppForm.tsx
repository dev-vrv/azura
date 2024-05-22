"use client";

import { Context } from "@/context/context";
import { Spinner } from "react-bootstrap";
import { useState, useEffect, useContext, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Button, FormControl } from "react-bootstrap";
import Link from "next/link";
import Icon from "@/components/icons/Icon";
import Form from 'react-bootstrap/Form';


interface PropsAppForm {
	appName: string;
	id: string;
}

interface IResponse {
    [key: string]: any;
}

export default function AppForm({ appName, id }: PropsAppForm) {
	const { context } = useContext(Context);
	const [data, setData] = useState<IResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const FetchData = useCallback(async () => {
		setError(false);
		const action = context.apps[appName]['retrieve_form']['action'];
		try {
            const url = `${context.api.url}${appName}/${id}/${action}/`;
			const res = await fetch(url);
			const data = await res.json();
            console.log(data);
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

	
	

 
	return (
		<div className="app-form">
            Form
		</div>
	);
}

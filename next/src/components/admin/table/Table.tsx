"use client";

import './Table.scss';

import Table from "react-bootstrap/Table";


interface PropsTableHead {
	fields: string[];
	selectable?: boolean;
}

interface PropsTableBody {
	selectable?: boolean;
}

export interface PropsTable {
	endPoint: string;
	fields: string[];
	title: string;
	selectable?: boolean;
}


function TableHead({fields, selectable}: PropsTableHead) {
	return (
		<thead>
			<tr>
				{fields.map((field, index) => {
					return (
						<th className='text-center' key={index}>{field}</th>
					)
				})}
			</tr>
		</thead>
	);
}

function TableBody(props: PropsTableBody) {
	return (
		<tbody>
			
		</tbody>
	);
}

export default function AppTable({fields, endPoint, title, selectable}: PropsTable) {
	return (
		<div className="w-100 h-100 d-flex flex-column gap-3">
            <div className="d-flex justify-content-between">
                <h3 className="text-capitalize">{title}</h3>
                <button className="btn btn-primary">Add</button>
            </div>
            <div className="h-100 overflow-y-scroll pe-2">
                <Table striped bordered hover size="sm">
                    {/* <TableHead selectable={selectable} fields={fields} /> */}
					{/* <TableBody /> */}
                </Table>
            </div>
        </div>
	);
}

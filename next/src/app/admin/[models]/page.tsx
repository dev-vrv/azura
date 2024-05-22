'use client';

import { Spinner } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import ContextProvider from '@/context/context';
import path from 'path';
import { Context } from '@/context/context';

interface PropsPageModelList {
	
}

export default function PageModelList({}: PropsPageModelList) {

	const pathname = usePathname();
	const pathParts = pathname.split('/').filter(part => part !== '' && part !== 'admin');
	const { context } = useContext(Context);

	return (
		<main className="main">
			<section className="section">
				<div className="h-100 w-100 d-flex justify-content-center align-items-center gap-2">
					<Spinner animation="grow" role="status"></Spinner>
					
				</div>
			</section>
		</main>
	);
}

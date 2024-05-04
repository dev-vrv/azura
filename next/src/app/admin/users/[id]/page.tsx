'use client';

import Section from "@/components/section/Section";
import { useRouter } from 'next/navigation'
import Icon from '@/components/Icons/Icons';
import './page.scss';
import { useEffect, useState } from 'react';
import { endPointUser } from '@/api/endPoints';
import Spinner from '@/components/spinner/Spinner';
import ModelForm from '@/components/forms/ModelForm';

export default function PageUser({ params }: { params: { id: string }}) {

    const router = useRouter();
    const id = parseInt(params.id);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch((endPointUser.controller.getUser.path + `${id}`), {
                    method: endPointUser.controller.getUser.method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        fetchUser();
    }, [id]);
    
    return (
        <main className="main">
            <Section className="h-100">
                {loading && <Spinner size='xl' className="h-100" />}
                {!loading && <>1231324</>}
            </Section>
        </main>
    );
}
'use client';

import Section from "@/components/section/Section";
import { useRouter } from 'next/navigation'
import Icon from "@/components/Icons/Icons";
import MForm from "@/components/formModel/Form";
import './page.scss';

export default function PageUser({ params }: { params: { id: string }}) {

    const router = useRouter();
    const id = parseInt(params.id);

    return (
        <main className="main">
            <Section className="h-100">
                <MForm back={router.back} />
            </Section>
        </main>
    );
}
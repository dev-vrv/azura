'use client';

import Section from "@/components/section/Section";
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/buttons/Buttons";
import MForm from "@/components/modelForm/ModelForm";
import { EndPoints } from "@/api/endPoints";
import './page.scss';
import { IGroup } from "@/components/modelForm/components/ModelGroup";





export default function PageUser({ params }: { params: { id: string }}) {
    
    const router = useRouter();
    const id = parseInt(params.id);

    const [user, setUser] = useState({} as any);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("User" as string);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(new EndPoints().getPointUser("getUser").path + id.toString());
            const user = await response.json();
            setUser(user);
            setUsername(user.email.value);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [id]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const fields_groups: IGroup[] = [
        {
            fields: user,
            fieldsNames: ["id", "email", "first_name", 'last_name'],
            title: "Base information",
            colSize: {
                lg: 6,
                md: 6,
                sm: 12,
            },
            rowSize: 12
        },
        {
            fields: user,
            fieldsNames: ["phone", "address", "city", "country", "zip_code", "birthday"],
            title: "Contact information",
            colSize: {
                lg: 6,
                md: 6,
                sm: 12,
            },
            rowSize: 12
        },
        {
            fields: user,
            fieldsNames: [["is_active", "is_staff", "is_superuser"], "status"],
            title: "Base Permissions",
            colSize: {
                lg: 6,
                md: 6,
                sm: 12,
            },
            rowSize: 6
        },
        {
            fields: user,
            fieldsNames: ["created_at", "updated_at", "last_session"],
            title: "Dates",
            colSize: {
                lg: 6,
                md: 6,
                sm: 12,
            },
            rowSize: 6
        }
    ]
    
    
    return (
        <main className="main">
            <Section className="model-page">
                <div className="model-page--header">
                    <div className="d-flex gap-2">
                        <Button 
                            onClick={() => router.back()}
                            icon={{ name: "left", size: "xl" }}>    
                        </Button>
                        <h2 className="h2">{username}</h2>
                    </div>
                </div>
                <div className="model-page--body">
                    <MForm fields={user} groups={fields_groups} />
                </div>
            </Section>
        </main>
    );
}
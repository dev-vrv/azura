'use client';
import Section from '@/components/section/Section';
import { useRouter } from 'next/navigation'
import Icon from '@/components/Icons/Icons';
import './page.scss';
import { useEffect, useState } from 'react';
import Spinner from '@/components/spinner/Spinner';
import { endPointUser } from '@/api/endPoints';
import { Input, Checkbox } from '@/components/fields/Input';

interface UserFieldProps {
    field: string;
    value: any;
    type: string;
}

function UserField({field, value, type}: UserFieldProps) {
    let fieldItem = null;
    if (type === 'boolean') {
        return <Checkbox id={field} checked={value} label={field.replace('_', ' ')} />
    }
    else if (type === 'text') {
        return <Input id={field} value={value} label={field.replace('_', ' ')} />
    }
    else if (type === 'readonly') {
        return <Input id={field} value={value} label={field.replace('_', ' ')} disabled={true} />
    }
    

}

function UserHeader({user_id, back}: {user_id: number; back: () => void}) {
    return (
        <div className="user__header">
        <button type="button" className="btn btn-icon" onClick={() => back()}>
            <Icon name="left" size="lg" />
        </button>
        <h4 className="h4">dev.vrv@gmail.com</h4>
    </div>
    )
}

function UserBody({user_id}: {user_id: number}) {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        fetch(endPointUser.controller.getUser.path + `${user_id}/`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [user_id]);
    


    return (
        <div className="user__body">
            {loading && <Spinner />}
            {error && <div>Error: {error.message}</div>}
            {user && (
                <form className='d-flex flex-column gap-3'>
                    {Object.keys(user.data).map((key, index) =>  (
                        <UserField key={index} {...{field: key, value: user.data[key], type: user.fields[key]}}  />
                    ))}
                </form>
            )}
        </div>
    )
}

function UserFooter() {
    return (
        <div className="user__footer">
            <button type="button" className="btn btn-primary">Save</button>
        </div>
    )

}

export default function PageUser({ params }: { params: { id: string } }) {
    const router = useRouter();
    const id = parseInt(params.id);

    return (
		<main className="main container-fluid py-4">
			<Section className="h-100 user">
				<UserHeader user_id={id} back={router.back} />
                <UserBody user_id={id} />
				<UserFooter />
			</Section>
		</main>
	);
}
'use client';
import Section from '@/components/section/Section';
import { useRouter } from 'next/navigation'
import Icon from '@/components/Icons/Icons';
import './page.scss';
import { useEffect, useState } from 'react';
import Spinner from '@/components/spinner/Spinner';



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
        fetch(`/api/users/${user_id}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [user_id]);

    return (
        <div className="user__body">

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
		<main className="main container-fluid">
			<Section className="h-100 user">
				<UserHeader user_id={id} back={router.back} />
                <UserBody user_id={id} />
				<UserFooter />
			</Section>
		</main>
	);
}
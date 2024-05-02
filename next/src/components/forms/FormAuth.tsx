'use client';

import { useFormState, useFormStatus } from "react-dom";
import { Input, Checkbox } from "../fields/Input";
import Icon from "../Icons/Icons";


function Submit({endPoint}: {endPoint: string}) {

    const { pending } = useFormStatus();
    return (
        <button 
        type="submit" 
        className="btn btn-primary mt-3" 
        aria-disabled={pending} 
        >
            <span>{pending ? 'Submitting...' : 'Sign in'}</span>
        </button>
    )
}

export default function FormAuth({ endPoint }: { endPoint: string }) {
    return (
        <form action={''} className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-2 mb-3">
                <h2 className="h2">
                    <Icon {...{name: 'logo', size: 'xl', color: 'primary'}} />
                </h2> 
                <p>Next admin login</p>
            </div>

            <Input {...{
                id: 'email',
                label: 'Email',
                placeholder: 'Enter your email',
                type: 'email'
                
            }} />
            <Input {...{
                id: 'password',
                label: 'Password',
                placeholder: 'Enter your password',
                type: 'password'
            }} />
            <Checkbox {...{
                id: 'remember',
                label: 'Remember me',
            }} />

            <Submit endPoint={endPoint} />
        </form>
    )
}
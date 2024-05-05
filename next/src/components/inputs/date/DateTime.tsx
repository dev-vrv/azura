import { useState } from 'react';
import { PropsDateTime } from '../Inputs';

export default function DateTime({id, name, label, required, disabled }: PropsDateTime) {
    return (
        <div className="">
            <label htmlFor={id}>{label}</label>
            <input type="datetime-local" className='form-input' id={id} name={name} required={required} disabled={disabled} />
        </div>
    )
}
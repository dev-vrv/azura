import React from 'react';
import './Card.scss';

interface CardProps {
    children?: React.ReactNode;
    className?: string;
}

export default function Card(props: CardProps) {
    return (
        <div className={`card shadow-sm ${props.className || ''}`}>
            {props.children || ''}
        </div>
    )
}
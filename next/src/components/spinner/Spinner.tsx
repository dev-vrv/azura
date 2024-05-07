import Icon from "../Icons/Icons";
import './Spinner.scss';

interface ISpinner {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    type?: 'block' | 'inline';
    className?: string;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    aos?: {
        animation: string;
        delay: string;
        duration: string;
    }
}

export default function Spinner({className='', size='lg', type='block', color='light'}: ISpinner) {
    return (
        <span 
            className={`spinner ${type == 'inline' ? 'spinner--inline' : ''} ${className}`} 
            role="status" 
        >
            <Icon name="loading" size={size} className={`text-${color}`} />
        </span>
    );
}
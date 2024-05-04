import Icon from "../Icons/Icons";
import './Spinner.scss';

interface ISpinner {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export default function Spinner({className, size='lg'}: ISpinner) {
    return (
        <div className={`spinner ${className}`} role="status" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="500">
            <Icon name="loading" size={size} />
        </div>
    );
}
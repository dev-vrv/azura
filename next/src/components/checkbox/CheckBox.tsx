import './CheckBox.scss'
import { FaCheck } from "react-icons/fa6";

interface checkboxProps {
    id: string;
    name?: string;
    checked?: boolean;
    text?: string;
    className?: string;
    onChange?: (event: any) => void;
}

function CheckBox({ id, name, checked, text, className, onChange }: checkboxProps) {
    return (
        <label
        htmlFor={id}
        className={className? className : 'label'}
        >
            <input 
            type="checkbox" 
            id={id} 
            name={name? name : id} 
            checked={checked} 
            onChange={onChange}
            />

            <i className='checkbox-view'>
                <FaCheck />
            </i>
            {text? <span>{text}</span> : null}
        </label>
    )
}

export default CheckBox;
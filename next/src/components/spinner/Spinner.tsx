import './Spinner.scss';
import { RiLoader2Fill } from "react-icons/ri";
export default function Spinner() {
    return (
        <div className="spinner" data-aos="zoom-in" data-aos-duration="500" data-aos-delay="500">
            <div className="spinner__body">
                <i className='spinner__icon'>
                    <RiLoader2Fill />
                </i>
            </div>
        </div>
    )
}
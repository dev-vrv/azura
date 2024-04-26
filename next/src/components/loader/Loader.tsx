import './Loader.scss';
import { RiLoader2Fill } from "react-icons/ri";
export default function Loader() {
    return (
        <div className="loader" data-aos="zoom-in" data-aos-duration="500" data-aos-delay="500">
            <div className="loader__body">
                <i className='loader__icon'>
                    <RiLoader2Fill />
                </i>
            </div>
        </div>
    )
}
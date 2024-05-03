import Icon from "../Icons/Icons";
import './Spinner.scss';


export default function Spinner() {
    return (
        <div className="spinner" role="status" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="500">
            <Icon name="loading" size="xl" />
        </div>
    );
}
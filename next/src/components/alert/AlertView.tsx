import { Alert } from "react-bootstrap";
import Icon from "../Icons/Icons";
import "./AlertView.scss";

export interface PropsAlertView {
    type: string;
    text: string;
    onClose?: () => void;
}

function AlertView({type, text, onClose}: PropsAlertView) {

    return (
        <Alert variant={type} onClose={() => onClose} dismissible data-aos="zoom-in" data-aos-duration="500">
            <Icon name="alert" size="lg" />
            <p>{text}</p>
        </Alert>
    )

}

export default AlertView;
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import './Alert.scss'
import { IoAlertCircleOutline } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";


interface AlertMessage {
    type: 'success' | 'warning' | 'danger' | 'info';
    heading: string;
    text?: string;
}

function AlertDismissible(props: AlertMessage) {
  const [show, setShow] = useState(true);
  const [type, heading, text] = [props.type, props.heading, props.text]

  const icon = () => {
    switch (type) {
      case 'success':
        return <FaRegCircleCheck/>
      case 'warning':
        return <IoAlertCircleOutline/>
      case 'danger':
        return <IoAlertCircleOutline/>
      case 'info':
        return <IoAlertCircleOutline/>
      default:
        return <IoAlertCircleOutline/>
    }
  }

  return (
		<div className={`alert alert-${type} ${show ? "show" : "hide"}`}>
			<div className="alert--info">
				<p className="">
					{<i>{icon()}</i>}
					{<span>{heading}</span>}
				</p>
				{text && <p>{text}</p>}
			</div>
			<button type="button" className="btn-close alert--button" onClick={() => setShow(false)}></button>
		</div>
  );
}

export default AlertDismissible;
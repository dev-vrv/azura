import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import './Alert.scss'
import { IoAlertCircleOutline } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";


interface AlertMessage {
    type: 'success' | 'warning' | 'danger' | 'info';
    text: string;
    heading?: string;
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
    <div className={`form-alert form-alert-${type} ${show ? 'show' : 'hide'}`}>
      <div className="d-flex flex-column justify-content-center align-items-start gap-2">
        <h5 className='h5 fw-normal d-flex align-items-center gap-1'>{heading} {icon()}</h5>
        <p>{text}</p>
      </div>
      <button 
      type='button' 
      className='btn-close'
      onClick={() => setShow(false)}
      ></button>
    </div>
  );
}

export default AlertDismissible;
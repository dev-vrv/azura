import './Header.scss';
import { CiSettings, CiBellOn, CiLogout, CiDark } from "react-icons/ci";

export default function Header() {
    return (
        <header className="header">
            <div className="header__left">
                <h1 className="header__title">Dashboard</h1>
            </div>
            <div className="header__right">
                <button className="btn btn-header">
                    <i>
                    <CiBellOn />
                    </i>
                </button>
                <button className="btn btn-header">
                    <i>
                    <CiDark />
                    </i>
                </button>
                <button className="btn btn-header">
                    <i>
                    <CiSettings />
                    </i>
                </button>
                <button className="btn btn-header">
                    <i>
                    <CiLogout />
                    </i>
                </button>
            </div>
        </header>
    )
}
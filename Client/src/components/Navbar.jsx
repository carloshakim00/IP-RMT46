import { Link, useNavigate } from "react-router-dom"
import Button from "./Button"
import home from "../assets/home.png"
import login from "../assets/login.png"
export default function Navbar() {
    const navigate = useNavigate();
    return (
        <>
            <div className="tw-navbar tw-bg-base-100">
                <div className="tw-navbar-start tw-ml-5">
                    <Button
                        container={<img className="tw-size-full" src={home} alt={"home"} />}
                        buttonClass={"tw-flex tw-flex-col tw-btn tw-btn-square tw-btn-ghost"}
                        onClick={() => navigate('/')} />
                    <div className="tw-flex-1 tw-ml-5">
                        <Link className="tw-font-bold tw-text-xl" to="/">MedShop</Link>
                    </div>
                </div>
                <div className="tw-flex-none tw-navbar-end">
                    <div className="tw-ml-5">
                        <Button
                            name={"Login"}
                            container={<img className="tw-size-full" src={login} alt={"login"} />}
                            buttonClass={"tw-flex tw-flex-col tw-mr-20 tw-btn tw-btn-square tw-btn-ghost"}
                            onClick={() => navigate('/login')} />
                    </div>
                </div>
            </div>
        </>
    )
}
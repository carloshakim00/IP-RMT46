import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import logo from "../assets/logo.jpg";
import login from "../assets/login.png";



export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="bg-white text-red-600">
            <div className="container mx-auto flex justify-between items-center py-4">
                <div className="flex items-center">
                    <Link to="/">
                        <img className="w-10 h-10 mr-2" src={logo} alt="home" />
                    </Link>
                    <Link className="font-bold text-xl" to="/">MedShop</Link>
                </div>
                <div>
                <Link to="/login" className="ml-5">
                        <img className="w-30 h-10" src={login} alt="login" />
                </Link>
                </div>
            </div>
            <div className="bg-white py-2">
                <div className="container mx-auto flex justify-between items-center mb-5">
                    <div>
                        <Button
                            name="Home"
                            buttonClass="mr-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => navigate('/')} />
                        <Button
                            name="About Us"
                            buttonClass="mr-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => navigate('/about')} />
                        <Button
                            name="Contact Us"
                            buttonClass="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => navigate('/contact')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

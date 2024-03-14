import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import serverRequest from "../utils/axios";
import Toastify from "../utils/toast";
export default function Register(){
    const navigate = useNavigate()
    const [userData,setUserData] = useState({
        username: "",
        email: "",
        password: "",
    })

    const onHandleRegister = async (e) =>{
        e.preventDefault()
        try {
            let { data } = await serverRequest({
                method: "POST",
                url: "/register",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: userData
            })
            navigate("/login")
            Toastify(`Successfully register ${data.username}`, "success")
        } catch (error) {
            Toastify(error.response?.data?.message || error.message, "error")
        }
    }

    const onChangeRegister = (e) =>{
        const key = e.target.name
        const value = e.target.value
        setUserData({...userData,[key]:value})
    }

    return(
        <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="new-user-section"
    >
        <div className="row">
            <div className="col-12 col-md-6">
                <div className="pt-3 pb-2 mb-3 border-bottom">
                    <form id="register-form">
                        <h1 className="h3 mb-3 display-1">Register User</h1>
                        <div className="mb-3">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="register-username">Username</label>
                                <label className="text-danger text-end fw-bold">*</label>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                id="register-username"
                                placeholder="Enter username ..."
                                autoComplete="off"
                                required=""
                                name="username"
                                onChange={onChangeRegister}
                                value={userData.username}
                            />
                        </div>
                        <div className="mb-3">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="register-email">Email</label>
                                <label className="text-danger text-end fw-bold">*</label>
                            </div>
                            <input
                                type="email"
                                className="form-control"
                                id="register-email"
                                placeholder="Enter email address ..."
                                autoComplete="off"
                                required=""
                                onChange={onChangeRegister}
                                name="email"
                                value={userData.email}
                            />
                        </div>
                        <div className="mb-3">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="register-password">Password</label>
                                <label className="text-danger text-end fw-bold">*</label>
                            </div>
                            <input
                                type="password"
                                className="form-control"
                                id="register-password"
                                placeholder="Enter password ..."
                                autoComplete="off"
                                required=""
                                value={userData.password}
                                name="password"
                                onChange={onChangeRegister}
                            />
                        </div>
                        <Button
                        buttonClass={"btn btn-primary"}
                        name={"Register"}
                        onClick={onHandleRegister}
                        >
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    )
}
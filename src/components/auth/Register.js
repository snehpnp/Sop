import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegistorUser } from '../CommonAPI/Common'
import Swal from 'sweetalert2'
import { Eye, EyeOff } from 'lucide-react'
import { GetLogo } from '../CommonAPI/Admin'


const Register = () => {
    const navigate = useNavigate()
    const [Username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [cnfPass, setCnfPass] = useState('')
    const [number, setNumber] = useState('')
    const [showPass, setShowPass] = useState(false);
    const [showCnfPass, setShowCnfPass] = useState(false);


    const handleRegistor = async () => {
        const data = {
            SignuserName: Username,
            Signpassword: pass,
            ConfirmPassword: cnfPass,
            SignEmail: email,
            mobile_no: number
        }
        await RegistorUser(data)
            .then((response) => {
                if (response.Status) {
                    Swal.fire({
                         // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "Success!",
                        text: response.message,
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true
                    });
                    setTimeout(() => {
                        navigate('/login')
                    }, 1500)
                }
                else {
                    Swal.fire({
                         // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "Error!",
                        text: response.message,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
            })
            .catch((err) => {
                console.log("Error in adding the new user", err)
            })
    }

    const GetLogoimage = async () => {
        await GetLogo()
            .then((response) => {
                if (response.status) {
                    document.getElementById('imglogo').src = "data:image/png;base64," + response.image_data
                    localStorage.setItem("logo", "data:image/png;base64," + response.image_data)
                } else {
                }
            })
            .catch((err) => {
                console.log("Error Group data fetch error", err);
            });
    };

    useEffect(() => { GetLogoimage() }, [])

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
            setNumber(value);
        }
    };

    return (
        <div>
            <section className="sign-in-page">
                <div className="container ">
                    <p className="sign-in-logo  text-center">
                        <img className="" alt="logo" id="imglogo" style={{ width: 'auto', height: 'auto', objectFit: 'cover' }} />
                    </p>
                    <div className="row no-gutters">


                        <div className="col-md-7 p-5 dark-card mx-auto">
                            <div className="">
                                <div className="row">
                                    <div className="form-group col-lg-6">
                                        <label htmlFor="username" className="mb-2">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control mb-0"
                                            id="username"
                                            placeholder="Enter Your Username"
                                            value={Username}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label htmlFor="phone" className="mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control mb-0"
                                            id="phone"
                                            placeholder="Enter Your Phone Number"
                                            value={number}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <label htmlFor="email" className="mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control mb-0"
                                            id="email"
                                            placeholder="Enter Your Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label htmlFor="password" className="mb-2">
                                            Password
                                        </label>
                                        <div className="input-container">
                                            <input
                                                type={showPass ? 'text' : 'password'}
                                                className="form-control mb-0"
                                                id="password"
                                                placeholder="Enter Your Password"
                                                value={pass}
                                                onChange={(e) => setPass(e.target.value)}
                                            />
                                            <div className="input-span" onClick={() => setShowPass(!showPass)}>
                                                {showPass ? <Eye /> : <EyeOff />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label htmlFor="confirm-password" className="mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="input-container">
                                            <input
                                                type={showCnfPass ? 'text' : 'password'}
                                                className="form-control mb-0"
                                                id="confirm-password"
                                                placeholder="Enter Confirm Password"
                                                value={cnfPass}
                                                onChange={(e) => setCnfPass(e.target.value)}
                                            />
                                            <div className="input-span" onClick={() => setShowCnfPass(!showCnfPass)}>
                                                {showCnfPass ? <Eye /> : <EyeOff />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex w-100 justify-content-end align-items-center my-3">
                                        <button type="submit" className="btn btn-primary float-end" onClick={handleRegistor}>
                                            Sign up
                                        </button>
                                    </div>
                                    <div className="sign-info">
                                        <span className="dark-color d-inline-block line-height-2">
                                            Already have an account? <Link to="/login">Sign in</Link>
                                        </span>
                                        {/* <ul className="iq-social-media">
                                            <li>
                                                <a href="#">
                                                    <i className="ri-facebook-box-line" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="ri-twitter-line" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="ri-instagram-line" />
                                                </a>
                                            </li>
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Register

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import { LoginPage, ForgotPassword } from '../CommonAPI/Common'
import { GetHeaderImg2, GetLogo, GetPanleName, GetHeaderImg1, Getfaviconimage, SubAdminPermission, AdminPermission } from '../CommonAPI/Admin'

const Login = () => {
    const [Username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [changeType, setChangeType] = useState("password");
    const [visiablity, setVisiablity] = useState("");
    const [showModal, setShowModal] = useState(false)
    const [forgotPassEmail, setForgotPassEmail] = useState('')
    const [forgotPassusername, setForgotPassusername] = useState('')
    const [userNameError, setUserNameError] = useState('')
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        const data = { Username: Username, password: password }
        await LoginPage(data)
            .then((response) => {
                if (response.Status) {
                    if (response.Role === 'Subadmin') {
                        getSubAdminPermission()
                    }
                    else if (response.Role === 'Admin') {
                        getAdminPermisson()
                    }
                    localStorage.setItem("Role", response.Role)
                    localStorage.setItem("name", Username)
                    localStorage.setItem("token", response.access_token)
                    Swal.fire({
                        //  // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "Login!",
                        text: "User Login successfully!",
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true
                    });

                    setTimeout(() => {
                        if (response.Role === 'Admin') {
                            navigate('/admin/dashboard');
                        } else if (response.Role === 'User') {
                            navigate('/user/dashboard');
                        } else if (response.Role === 'Superadmin') {
                            navigate('/superadmin/dashboard');
                        }
                        else if (response.Role === 'Subadmin') {
                            navigate('/subadmin/dashboard');
                        }
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
                console.log("Error in user login", err)
            })
    };


    const getSubAdminPermission = async () => {
        const req = { username: Username }
        await SubAdminPermission(req)
            .then((response) => {
                if (response.Status) {
                    localStorage.setItem("SubAdminPermission", JSON.stringify(response.Data))
                }
            })
            .catch((err) => {
                console.log("Error in fetching the permission", err)
            })
    }

    const getAdminPermisson = async () => {
        const req = { username: Username }
        await AdminPermission(req)
            .then((response) => {
                if (response.Status) {
                    localStorage.setItem("AdminPermission", JSON.stringify(response.Data))
                }
            })
            .catch((err) => {
                console.log("Error in fetching the permission", err)
            })
    }


    const toggle = (e) => {
        e.preventDefault();
        if (changeType === "password") {
            setChangeType("text");
            setVisiablity("eye");
        } else {
            setChangeType("password");
        }
    };


    const handleForgotPass = async () => {
        if (!emailError && !userNameError) {
            const data = { Email: forgotPassEmail, username: forgotPassusername }

            await ForgotPassword(data)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                             // background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "Success",
                            text: response.Data,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true
                        });
                        setShowModal(false)
                    }
                    else {
                        Swal.fire({
                             // background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "Error",
                            text: response.Data,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });

                    }
                })
                .catch((err) => {
                    console.log("Error in sending the mail", err)
                })

        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setForgotPassEmail(email);
        if (!email) {
            setEmailError('Email cannot be empty');
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handleUsernameChange = (e) => {
        const username = e.target.value;
        setForgotPassusername(username);
        if (!username) {
            setUserNameError('Email cannot be empty');
        } else {
            setUserNameError('');
        }
    }


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
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

    const get_header_img1 = async () => {
        await GetHeaderImg1()
            .then((response) => {
                if (response.status) {
                    localStorage.setItem("header_img1", "data:image/png;base64," + response.image_data)
                } else {
                }
            })
            .catch((err) => {
                console.log("Error Group data fetch error", err);
            });
    };

    const get_header_img2 = async () => {
        await GetHeaderImg2()
            .then((response) => {
                if (response.status) {
                    localStorage.setItem("header_img2", "data:image/png;base64," + response.image_data)
                } else {
                }
            })
            .catch((err) => {
                console.log("Error Group data fetch error", err);
            });
    };

    const Getfaviconimg = async () => {
        await Getfaviconimage()
            .then((response) => {
                if (response.status) {
                    document.getElementsByClassName("set_favicon")[0].href = "data:image/png;base64," + response.image_data;
                    localStorage.setItem("fevicon", "data:image/png;base64," + response.image_data)
                } else {

                }
            })
            .catch((err) => {
                console.log("Error Group data fetch error", err);
            });
    };

    const GetPanel_Name = async () => {
        await GetPanleName()
            .then((response) => {
                if (response.Status) {
                    document.getElementsByClassName("title_name")[0].innerText = response.CompanyName;
                    localStorage.setItem("pannel_name", response.CompanyName)
                } else {

                }
            })
            .catch((err) => {
                console.log("Error Group data fetch error", err);
            });
    };

    useEffect(() => {
        get_header_img2();
        get_header_img1();
        Getfaviconimg();
        GetPanel_Name();
        GetLogoimage();
    }, [])

    return (
        <section className="sign-in-page">
            <div className="container ">
                <div className="row no-gutters">
                    <p className="sign-in-logo  text-center">
                        <img
                            className=""
                            alt="logo"
                            id="imglogo"
                            style={{
                                width: '150px',         // Fixed smaller width
                                height: 'auto',         // Maintain aspect ratio
                                objectFit: 'contain',   // Don't crop the logo
                            }}
                        />

                    </p>
                    <div className="col-md-7 dark-card mx-auto p-5">
                        <div className="">

                            <h1 className="mb-0">Sign in</h1>
                            {/* <p>Enter your email address and password to access admin panel.</p> */}
                            <div> {/* Wrap inputs in a form */}
                                <div className="mt-4">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1" className="mb-2">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control mb-0"
                                            id="exampleInputEmail1"
                                            placeholder="Enter Your Username"
                                            value={Username}
                                            onChange={(e) => setUserName(e.target.value)}
                                            onKeyPress={handleKeyPress}

                                        />
                                    </div>
                                    <div className="d-flex justify-content-between my-2">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <a className="float-end border-none" onClick={(e) => setShowModal(!showModal)}>
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div className="position-relative">
                                        <input
                                            type={changeType}
                                            className="form-control mb-0"
                                            id="exampleInputPassword1"
                                            placeholder="Enter Your Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                        />

                                        <i
                                            className={
                                                changeType === "text"
                                                    ? "ri-eye-line password-eye"
                                                    : "ri-eye-off-line password-eye"
                                            }
                                            onClick={(e) => toggle(e)}
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Password Visibility"
                                        ></i>
                                    </div>
                                    <div className="d-flex w-100 justify-content-end align-items-center mt-3">
                                        <button type="submit" className="btn btn-primary float-end " onKeyPress={handleKeyPress} onClick={handleLogin}>
                                            Sign in
                                        </button>
                                    </div>
                                </div>
                            </div> {/* Closing the form */}
                            <div className="sign-info">
                                <span className="dark-color d-inline-block line-height-2">
                                    Don't have an account? <Link to={'/register'}>Sign up</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {showModal && (
                <div className="modal custom-modal d-flex" id="add_vendor" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content forgett">
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0">
                                    <h4 className="mb-0">Forgot Password</h4>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setShowModal(!showModal)}
                                />
                            </div>
                            <div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12 col-sm-12">
                                            <div className="input-block mb-3">
                                                <label>Email</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Email"
                                                    onChange={handleEmailChange}
                                                    value={forgotPassEmail}
                                                />
                                                {emailError && (
                                                    <div className="error-message" style={{ color: 'red' }}>
                                                        {emailError}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* <div className="col-lg-12 col-sm-12">
                                            <div className="input-block mb-3">
                                                <label>Username</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Username"
                                                    onChange={handleUsernameChange}
                                                    value={forgotPassusername}
                                                />
                                                {userNameError && (
                                                    <div className="error-message" style={{ color: 'red' }}>
                                                        {userNameError}
                                                    </div>
                                                )}
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="submit"
                                        data-bs-dismiss="modal"
                                        className="btn btn-primary paid-continue-btn"
                                        onClick={handleForgotPass}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </section>

    );
};

export default Login;

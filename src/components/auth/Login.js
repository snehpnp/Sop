import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import { LoginPage, ForgotPassword, RegistorUser } from '../CommonAPI/Common'
import { GetHeaderImg2, GetLogo, GetPanleName, GetHeaderImg1, Getfaviconimage, SubAdminPermission, AdminPermission } from '../CommonAPI/Admin'
import './login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; 

// Custom animated login success overlay (algo trading themed, fast, unique)
const LoginSuccessOverlay = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(onFinish, 1100); // faster
        return () => clearTimeout(timer);
    }, [onFinish]);
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(18, 16, 16, 0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            animation: 'fadeIn 0.3s',
        }}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes algoLine {
                    0% { stroke-dashoffset: 120; }
                    80% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: 0; }
                }
                @keyframes algoDot {
                    0% { opacity: 0; }
                    60% { opacity: 0; }
                    80% { opacity: 1; }
                    100% { opacity: 1; }
                }
            `}</style>
            {/* Algo trading line chart animation */}
            <svg width="120" height="70" viewBox="0 0 120 70" style={{ marginBottom: 18 }}>
                <polyline
                    points="10,60 30,40 50,50 70,20 90,35 110,10"
                    fill="none"
                    stroke="#1ccc8a"
                    strokeWidth="4"
                    strokeDasharray="120"
                    strokeDashoffset="0"
                    style={{
                        filter: 'drop-shadow(0 0 8px #1ccc8a)',
                        animation: 'algoLine 0.7s cubic-bezier(.7,0,.3,1) forwards'
                    }}
                />
                {/* Dots at each point */}
                {[{x:10,y:60},{x:30,y:40},{x:50,y:50},{x:70,y:20},{x:90,y:35},{x:110,y:10}].map((pt,i)=>(
                    <circle key={i} cx={pt.x} cy={pt.y} r="5" fill="#fff" stroke="#1ccc8a" strokeWidth="2" style={{
                        opacity: 0,
                        animation: `algoDot 0.9s ${0.1 + i*0.08}s forwards`
                    }}/>
                ))}
            </svg>
            <h2 style={{ color: '#1ccc8a', marginTop: 0, fontWeight: 700, letterSpacing: 1, fontSize: 28, textShadow: '0 2px 8px #111' }}>Login Successful!</h2>
            <p style={{ color: '#fff', fontSize: 15, marginTop: 4, fontWeight: 500, letterSpacing: 0.5 }}>Welcome to Smart Trading</p>
        </div>
    );
};

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
    const [signinData, setSigninData] = useState({ username: '', password: '' });
    const [signupData, setSignupData] = useState({
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [signupShowPassword, setSignupShowPassword] = useState({ password: false, confirmPassword: false });
    const [signinShowPassword, setSigninShowPassword] = useState(false);
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (usernameArg, passwordArg) => {
        const user = usernameArg !== undefined ? usernameArg : Username;
        const pass = passwordArg !== undefined ? passwordArg : password;
        const data = { Username: user, password: pass };
        await LoginPage(data)
            .then((response) => {
                if (response.Status) {
                    toast.success('Login Successful!', {
                        position: 'top-right',
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark',
                    });
                    if (response.Role === 'Subadmin') {
                        getSubAdminPermission()
                    }
                    else if (response.Role === 'Admin') {
                        getAdminPermisson()
                    }
                    localStorage.setItem("Role", response.Role)
                    localStorage.setItem("name", user)
                    localStorage.setItem("token", response.access_token)
                    setShowLoginSuccess(true); // Show animated overlay
                    // Navigate instantly after animation overlay ends
                    setTimeout(() => {
                        setShowLoginSuccess(false);
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
                    }, 1100); // match overlay duration
                }
                else {
                    Swal.fire({
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


  
    const [rightPanelActive, setRightPanelActive] = useState(false);


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

    const signinHandler = (e) => {
        e.preventDefault();
        // Always get the latest values from the DOM in case of autofill
        const username = document.querySelector('.newlogin-sign-in-container input[name="username"]')?.value || signinData.username;
        const password = document.querySelector('.newlogin-sign-in-container input[name="password"]')?.value || signinData.password;
        if (username && password) {
            // Pass directly to handleLogin, do not rely on setState (which is async)
            handleLogin(username, password);
        } else {
            Swal.fire({
                backdrop: "#121010ba",
                confirmButtonColor: "#1ccc8a",
                title: "Error!",
                text: "Please fill all the fields",
                icon: "error",
                timer: 1500,
                timerProgressBar: true
            });
        }
    }



    const handleRegistor = async (e) => {
        if (e) e.preventDefault();
        // Phone number validation: must be exactly 10 digits
        if (!/^\d{10}$/.test(signupData.phone)) {
            Swal.fire({
                backdrop: "#121010ba",
                confirmButtonColor: "#1ccc8a",
                title: "Error!",
                text: "Phone number must be exactly 10 digits!",
                icon: "error",
                timer: 1500,
                timerProgressBar: true
            });
            return;
        }
        if (signupData.password !== signupData.confirmPassword) {
            Swal.fire({
                backdrop: "#121010ba",
                confirmButtonColor: "#1ccc8a",
                title: "Error!",
                text: "Password and Confirm Password must be the same!",
                icon: "error",
                timer: 1500,
                timerProgressBar: true
            });
            return;
        }
        const data = {
            SignuserName: signupData.username,
            mobile_no: signupData.phone,
            SignEmail: signupData.email,
            Signpassword: signupData.password,
            ConfirmPassword: signupData.confirmPassword
        }

        await RegistorUser(data)
            .then((response) => {
                if (response.Status) {
                    toast.success(response.message, {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        onClose: () => setRightPanelActive(false)
                    });
                } else {
                    return Swal.fire({
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


    return (
        <section className="sign-in-page">


            <div className="newlogin-body" style={{ minHeight: "100vh" }}>
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

                <div
                    className={`newlogin-container${rightPanelActive ? " right-panel-active" : ""}`}
                    id="container"
                >
                    <div className="newlogin-form-container newlogin-sign-up-container">
                        <form className="newlogin-form" onSubmit={e => handleRegistor(e)}>
                            <h1 className="newlogin-h1">Create Account</h1>
                            <div className="newlogin-social-container">
                                {/* <a href="#" className="newlogin-social"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="newlogin-social"><i className="fab fa-google-plus-g"></i></a>
                                    <a href="#" className="newlogin-social"><i className="fab fa-linkedin-in"></i></a> */}
                            </div>
                            <span className="newlogin-span">or use your email for registration</span>
                            <div style={{ display: 'flex', gap: 10, width: '100%' }}>
                                <input
                                    type="text"
                                    name="username"
                                    autoComplete="username"
                                    placeholder="Username"
                                    className="newlogin-input"
                                    style={{ width: '50%' }}
                                    value={signupData.username}
                                    onChange={e => setSignupData({ ...signupData, username: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    autoComplete="tel"
                                    placeholder="Phone Number"
                                    className="newlogin-input"
                                    style={{ width: '50%' }}
                                    value={signupData.phone}
                                    onChange={e => setSignupData({ ...signupData, phone: e.target.value })}
                                />
                            </div>
                            <input
                                type="email"
                                name="email"
                                autoComplete="email"
                                placeholder="Email"
                                className="newlogin-input"
                                style={{ width: '100%' }}
                                value={signupData.email}
                                onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                            />
                            <div style={{ display: 'flex', gap: 10, width: '100%' }}>
                                <div style={{ position: 'relative', width: '50%' }}>
                                    <input
                                        type={signupShowPassword.password ? 'text' : 'password'}
                                        name="password"
                                        autoComplete="new-password"
                                        placeholder="Password"
                                        className="newlogin-input"
                                        style={{ width: '100%', paddingRight: 35 }}
                                        value={signupData.password}
                                        onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                                    />
                                    <span
                                        style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#888', fontSize: 18 }}
                                        onClick={() => setSignupShowPassword(s => ({ ...s, password: !s.password }))}
                                    >
                                        {signupShowPassword.password ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                <div style={{ position: 'relative', width: '50%' }}>
                                    <input
                                        type={signupShowPassword.confirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        autoComplete="new-password"
                                        placeholder="Confirm Password"
                                        className="newlogin-input"
                                        style={{ width: '100%', paddingRight: 35 }}
                                        value={signupData.confirmPassword}
                                        onChange={e => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                                    />
                                    <span
                                        style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#888', fontSize: 18 }}
                                        onClick={() => setSignupShowPassword(s => ({ ...s, confirmPassword: !s.confirmPassword }))}
                                    >
                                        {signupShowPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            <button className="newlogin-button">Sign Up</button>
                        </form>
                    </div>
                    <div className="newlogin-form-container newlogin-sign-in-container">
                        <form className="newlogin-form" autoComplete="on" onSubmit={signinHandler} >
                            <h1 className="newlogin-h1">Sign in</h1>
                            <div className="newlogin-social-container">
                                {/* <a href="#" className="newlogin-social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="newlogin-social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="newlogin-social"><i className="fab fa-linkedin-in"></i></a> */}
                            </div>
                            <span className="newlogin-span">or use your account</span>
                            <input
                                type="text"
                                name="username"
                                autoComplete="username"
                                placeholder="Username"
                                className="newlogin-input"
                                value={signinData.username}
                                onChange={e => setSigninData({ ...signinData, username: e.target.value })}
                            />
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    type={signinShowPassword ? 'text' : 'password'}
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    className="newlogin-input"
                                    value={signinData.password}
                                    onChange={e => setSigninData({ ...signinData, password: e.target.value })}
                                    style={{ width: '100%', paddingRight: 40 }}
                                />
                                <span
                                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#888', fontSize: 18 }}
                                    onClick={() => setSigninShowPassword(v => !v)}
                                >
                                    {signinShowPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <a href="#" className="newlogin-a" onClick={e => { e.preventDefault(); setShowModal(true); }}>Forgot your password?</a>
                            <button className="newlogin-button">Sign In</button>
                        </form>
                    </div>
                    <div className="newlogin-overlay-container">
                        <div className="newlogin-overlay">
                            <div className="newlogin-overlay-panel newlogin-overlay-left">
                                <h1 className="newlogin-h1">Welcome Back, Trader!</h1>
                                <p className="newlogin-p">Log in and unlock the power of real-time scalping.</p>
                                <button
                                    className="newlogin-button newlogin-ghost"
                                    id="signIn"
                                    type="button"
                                    onClick={() => setRightPanelActive(false)}
                                >
                                    Sign In
                                </button>
                            </div>
                            <div className="newlogin-overlay-panel newlogin-overlay-right">
                                <h1 className="newlogin-h1">Ready to Begin?</h1>
                                <p className="newlogin-p">Start your journey into smart, fast, and automated trading!</p>
                                <button
                                    className="newlogin-button newlogin-ghost"
                                    id="signUp"
                                    type="button"
                                    onClick={() => setRightPanelActive(true)}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="newlogin-footer">

                </footer>
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
            {showLoginSuccess && <LoginSuccessOverlay onFinish={() => setShowLoginSuccess(false)} />}
            <ToastContainer />
        </section>

    );
};

export default Login;

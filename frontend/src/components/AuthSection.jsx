import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    registerUser,
    loginUser,
} from "../services/authService";

function AuthSection() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });

    return (
        <section id="auth" className="auth-section">

            <div className="auth-left">

                <div className="auth-content">

                    <h1>
                        Smart <br />
                        City<span>.</span>
                    </h1>

                    <p>
                        A unified platform for citizens
                        to access government services.
                    </p>

                    <div className="stats">

                        <div className="stat-item">
                            <h3>10K+</h3>
                            <p>Citizens</p>
                        </div>

                        <div className="stat-item">
                            <h3>50+</h3>
                            <p>Services</p>
                        </div>

                        <div className="stat-item">
                            <h3>24/7</h3>
                            <p>Support</p>
                        </div>

                    </div>

                </div>

            </div>

            <div className="auth-right">

                {isLogin ? (
                    <>
                        <h2>Welcome Back</h2>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={loginData.email}
                            onChange={(e) =>
                                setLoginData({
                                    ...loginData,
                                    email: e.target.value,
                                })
                            }
                        />

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) =>
                                setLoginData({
                                    ...loginData,
                                    password: e.target.value,
                                })
                            }
                        />

                        <button>Login</button>

                        <p>
                            Don't have an account?{" "}
                            <span
                                onClick={() => setIsLogin(false)}
                            >
                                Register
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <h2>Create Account</h2>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={registerData.name}
                            onChange={(e) =>
                                setRegisterData({
                                    ...registerData,
                                    name: e.target.value,
                                })
                            }
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={registerData.email}
                            onChange={(e) =>
                                setRegisterData({
                                    ...registerData,
                                    email: e.target.value,
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Mobile Number"
                            value={registerData.mobile}
                            onChange={(e) =>
                                setRegisterData({
                                    ...registerData,
                                    mobile: e.target.value,
                                })
                            }
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={registerData.password}
                            onChange={(e) =>
                                setRegisterData({
                                    ...registerData,
                                    password: e.target.value,
                                })
                            }
                        />

                        <button>Register</button>

                        <p>
                            Already have an account?{" "}
                            <span
                                onClick={() => setIsLogin(true)}
                            >
                                Login
                            </span>
                        </p>
                    </>
                )}

            </div>

        </section>
    );
}

export default AuthSection;
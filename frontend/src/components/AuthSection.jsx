import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";

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
    const handleRegister = async () => {
        try {

            const response = await registerUser(registerData);

            alert(response.message); // alert(response.message);

            setIsLogin(true);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );// alert(response.message);

        }
    };
    const handleLogin = async () => {
        try {

            const response = await loginUser(loginData);

            localStorage.setItem("token", response.token);
            localStorage.setItem(
                "user",
                JSON.stringify(response.user)
            );

            window.location.href = "/portal";
            // window.scrollTo({
            //     top: 0,
            //     behavior: "instant"
            // });

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <section id="auth" className="auth-section">

            <div className="auth-left">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="auth-video"
                >
                    <source
                        src="/videos/glass_bg.webm"
                        type="video/webm"
                    />
                </video>

                <div className="video-overlay"></div>

                <div className="auth-content">

                    <h1>
                        Smart <br />
                        <span className="city-text">
                            City<span className="dot">.</span>
                        </span>
                    </h1>

                    <div className="stats">
                        <div className="stat-item support-stat">
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

                        <button onClick={handleLogin}>
                            Login
                        </button>

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

                        <button onClick={handleRegister}>
                            Register
                        </button>

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
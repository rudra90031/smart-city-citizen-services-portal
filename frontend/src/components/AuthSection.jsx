import { useState } from "react";

function AuthSection() {
    const [isLogin, setIsLogin] = useState(true);

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
                        />

                        <input
                            type="password"
                            placeholder="Enter your password"
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
                        />

                        <input
                            type="email"
                            placeholder="Email"
                        />

                        <input
                            type="text"
                            placeholder="Mobile Number"
                        />

                        <input
                            type="password"
                            placeholder="Password"
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
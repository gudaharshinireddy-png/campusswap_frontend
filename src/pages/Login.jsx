import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");
    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        /* =====================================================
           VALIDATION
           ===================================================== */

        if (!formData.email.trim()) {

            setError(
                "Please enter your email address."
            );

            return;
        }


        if (!formData.email.includes("@")) {

            setError(
                "Please enter a valid email address."
            );

            return;
        }


        if (!formData.password) {

            setError(
                "Please enter your password."
            );

            return;
        }


        setLoading(true);
        setError("");


        /* =====================================================
           LOGIN API
           ===================================================== */

        try {

            const response = await axios.post(
                "http://localhost:8080/api/users/login",
                {
                    email: formData.email.trim(),
                    password: formData.password
                }
            );


            /* =================================================
               SAVE USER THROUGH AUTH CONTEXT
               ================================================= */

            login(response.data);


            /* =================================================
               GO TO DASHBOARD
               ================================================= */

            navigate("/dashboard");


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            if (error.response) {

                setError(

                    typeof error.response.data === "string"

                        ? error.response.data

                        : "Invalid email or password."

                );

            } else {

                setError(
                    "Unable to connect to the server. Please make sure the backend is running."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="auth-page">


            <div className="auth-background-orb auth-orb-one"></div>

            <div className="auth-background-orb auth-orb-two"></div>


            <div className="auth-container">


                {/* =================================================
                    LEFT SIDE
                    ================================================= */}

                <div className="auth-brand-panel">


                    <Link
                        to="/"
                        className="auth-brand"
                    >

                        <div className="brand-icon">
                            C
                        </div>

                        <span>
                            Campus<span>Swap</span>
                        </span>

                    </Link>


                    <div className="auth-panel-content">


                        <div className="hero-badge">

                            <span className="badge-dot"></span>

                            Welcome Back

                        </div>


                        <h1>

                            Your campus.

                            <br />

                            <span>
                                Your community.
                            </span>

                        </h1>


                        <p>

                            Sign in to discover donated items,
                            manage your donations and connect
                            with fellow students.

                        </p>


                        <div className="auth-benefits">


                            <div>

                                <span>
                                    ✓
                                </span>

                                Discover useful items

                            </div>


                            <div>

                                <span>
                                    ✓
                                </span>

                                Donate what you no longer need

                            </div>


                            <div>

                                <span>
                                    ✓
                                </span>

                                Help fellow students

                            </div>


                        </div>

                    </div>


                    <div className="auth-panel-footer">

                        © 2026 CampusSwap

                    </div>


                </div>


                {/* =================================================
                    RIGHT SIDE
                    ================================================= */}

                <div className="auth-form-panel">


                    <div className="auth-form-wrapper">


                        {/* MOBILE BRAND */}

                        <div className="mobile-brand">

                            <Link
                                to="/"
                                className="auth-brand"
                            >

                                <div className="brand-icon">
                                    C
                                </div>

                                <span>
                                    Campus<span>Swap</span>
                                </span>

                            </Link>

                        </div>


                        {/* FORM HEADING */}

                        <div className="form-heading">

                            <span className="form-eyebrow">
                                ACCOUNT ACCESS
                            </span>


                            <h2>
                                Welcome back
                            </h2>


                            <p>
                                Enter your details to continue to CampusSwap.
                            </p>

                        </div>


                        {/* ERROR */}

                        {error && (

                            <div className="form-error">

                                <span>
                                    !
                                </span>

                                {error}

                            </div>

                        )}


                        {/* LOGIN FORM */}

                        <form onSubmit={handleSubmit}>


                            {/* EMAIL */}

                            <div className="form-group">

                                <label htmlFor="email">
                                    Email Address
                                </label>


                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        ✉
                                    </span>


                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                    />

                                </div>

                            </div>


                            {/* PASSWORD */}

                            <div className="form-group">


                                <div className="label-row">

                                    <label htmlFor="password">
                                        Password
                                    </label>


                                    <span className="password-hint">
                                        Min. 6 characters
                                    </span>

                                </div>


                                <div className="input-wrapper">


                                    <span className="input-icon">
                                        ⌑
                                    </span>


                                    <input
                                        id="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                    />


                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    >

                                        {showPassword
                                            ? "Hide"
                                            : "Show"}

                                    </button>

                                </div>

                            </div>


                            {/* LOGIN BUTTON */}

                            <button
                                type="submit"
                                className="auth-submit"
                                disabled={loading}
                            >

                                {loading ? (

                                    <>

                                        <span className="button-spinner"></span>

                                        Signing in...

                                    </>

                                ) : (

                                    <>

                                        Sign In

                                        <span>
                                            →
                                        </span>

                                    </>

                                )}

                            </button>


                        </form>


                        {/* REGISTER */}

                        <div className="auth-divider">

                            <span>
                                New to CampusSwap?
                            </span>

                        </div>


                        <Link
                            to="/register"
                            className="outline-auth-button"
                        >
                            Create a new account
                        </Link>


                        {/* HOME */}

                        <Link
                            to="/"
                            className="back-home"
                        >
                            ← Back to home
                        </Link>


                    </div>

                </div>

            </div>

        </div>

    );
}


export default Login;
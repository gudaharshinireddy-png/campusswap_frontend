import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        year: "",
        role: "STUDENT"
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");
        setSuccess("");
    };

    const handleRoleChange = (role) => {
        setFormData({
            ...formData,
            role: role,
            department: role === "ADMIN" ? "" : formData.department,
            year: role === "ADMIN" ? "" : formData.year
        });

        setError("");
        setSuccess("");
    };

    const validateForm = () => {

        if (!formData.name.trim()) {
            return "Please enter your full name.";
        }

        if (!formData.email.trim()) {
            return "Please enter your email address.";
        }

        if (!formData.email.includes("@")) {
            return "Please enter a valid email address.";
        }

        if (!formData.password) {
            return "Please create a password.";
        }

        if (formData.password.length < 6) {
            return "Password must contain at least 6 characters.";
        }

        if (!formData.phone.trim()) {
            return "Please enter your phone number.";
        }

        if (!/^[0-9]{10}$/.test(formData.phone)) {
            return "Please enter a valid 10-digit phone number.";
        }

        if (formData.role === "STUDENT") {

            if (!formData.department.trim()) {
                return "Please select your department.";
            }

            if (!formData.year) {
                return "Please select your year of study.";
            }
        }

        return null;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {

            await axios.post(
                "http://localhost:8080/api/users/register",
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,

                    department:
                        formData.role === "STUDENT"
                            ? formData.department
                            : null,

                    year:
                        formData.role === "STUDENT"
                            ? formData.year
                            : null,

                    role: formData.role
                }
            );

            setSuccess(
                `${formData.role === "ADMIN" ? "Admin" : "Student"} account created successfully! Redirecting to login...`
            );

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (error) {

            if (error.response) {

                setError(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Unable to create your account."
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
        <div className="auth-page register-page">

            <div className="auth-background-orb auth-orb-one"></div>
            <div className="auth-background-orb auth-orb-two"></div>

            <div className="auth-container">

                {/* Left Side */}
                <div className="auth-brand-panel register-panel">

                    <Link to="/" className="auth-brand">
                        <div className="brand-icon">C</div>

                        <span>
                            Campus<span>Swap</span>
                        </span>
                    </Link>

                    <div className="auth-panel-content">

                        <div className="hero-badge">
                            <span className="badge-dot"></span>
                            Join CampusSwap
                        </div>

                        <h1>
                            Share what
                            <br />
                            <span>you don't need.</span>
                        </h1>

                        <p>
                            Create your CampusSwap account and become
                            part of a student community built around
                            sharing useful items.
                        </p>

                        <div className="register-stats">

                            <div>
                                <strong>01</strong>
                                <span>List a donation</span>
                            </div>

                            <div>
                                <strong>02</strong>
                                <span>Help another student</span>
                            </div>

                            <div>
                                <strong>03</strong>
                                <span>Build a better campus</span>
                            </div>

                        </div>

                    </div>

                    <div className="auth-panel-footer">
                        © 2026 CampusSwap
                    </div>

                </div>

                {/* Right Side */}
                <div className="auth-form-panel">

                    <div className="auth-form-wrapper register-form-wrapper">

                        <div className="mobile-brand">

                            <Link to="/" className="auth-brand">

                                <div className="brand-icon">
                                    C
                                </div>

                                <span>
                                    Campus<span>Swap</span>
                                </span>

                            </Link>

                        </div>

                        <div className="form-heading">

                            <span className="form-eyebrow">
                                CREATE ACCOUNT
                            </span>

                            <h2>Join CampusSwap</h2>

                            <p>
                                Choose your account type and enter your details.
                            </p>

                        </div>

                        {error && (
                            <div className="form-error">
                                <span>!</span>
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="form-success">
                                <span>✓</span>
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            {/* Account Type */}
                            <div className="form-group">

                                <label>
                                    Account Type
                                </label>

                                <div className="role-selector">

                                    <button
                                        type="button"
                                        className={
                                            formData.role === "STUDENT"
                                                ? "role-option active"
                                                : "role-option"
                                        }
                                        onClick={() =>
                                            handleRoleChange("STUDENT")
                                        }
                                    >
                                        <span className="role-icon">
                                            🎓
                                        </span>

                                        <span>
                                            <strong>Student</strong>
                                            <small>
                                                Donate & request items
                                            </small>
                                        </span>

                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            formData.role === "ADMIN"
                                                ? "role-option active"
                                                : "role-option"
                                        }
                                        onClick={() =>
                                            handleRoleChange("ADMIN")
                                        }
                                    >
                                        <span className="role-icon">
                                            🛡️
                                        </span>

                                        <span>
                                            <strong>Admin</strong>
                                            <small>
                                                Manage CampusSwap
                                            </small>
                                        </span>

                                    </button>

                                </div>

                            </div>

                            {/* Name + Phone */}
                            <div className="form-two-columns">

                                <div className="form-group">

                                    <label htmlFor="name">
                                        Full Name
                                    </label>

                                    <div className="input-wrapper">

                                        <span className="input-icon">
                                            ♙
                                        </span>

                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            placeholder="Your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            autoComplete="name"
                                        />

                                    </div>

                                </div>

                                <div className="form-group">

                                    <label htmlFor="phone">
                                        Phone Number
                                    </label>

                                    <div className="input-wrapper">

                                        <span className="input-icon">
                                            ☎
                                        </span>

                                        <input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            placeholder="10-digit number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            maxLength="10"
                                        />

                                    </div>

                                </div>

                            </div>

                            {/* Email */}
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

                            {/* Password */}
                            <div className="form-group">

                                <label htmlFor="password">
                                    Password
                                </label>

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
                                        placeholder="At least 6 characters"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword
                                            ? "Hide"
                                            : "Show"}
                                    </button>

                                </div>

                            </div>

                            {/* Student Only Fields */}
                            {formData.role === "STUDENT" && (

                                <div className="form-two-columns">

                                    <div className="form-group">

                                        <label htmlFor="department">
                                            Department
                                        </label>

                                        <div className="input-wrapper select-wrapper">

                                            <span className="input-icon">
                                                ⌂
                                            </span>

                                            <select
                                                id="department"
                                                name="department"
                                                value={formData.department}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Select department
                                                </option>

                                                <option value="CSE">
                                                    Computer Science
                                                </option>

                                                <option value="ECE">
                                                    Electronics
                                                </option>

                                                <option value="EEE">
                                                    Electrical
                                                </option>

                                                <option value="MECH">
                                                    Mechanical
                                                </option>

                                                <option value="CIVIL">
                                                    Civil
                                                </option>

                                                <option value="IT">
                                                    Information Technology
                                                </option>

                                                <option value="OTHER">
                                                    Other
                                                </option>

                                            </select>

                                        </div>

                                    </div>

                                    <div className="form-group">

                                        <label htmlFor="year">
                                            Year of Study
                                        </label>

                                        <div className="input-wrapper select-wrapper">

                                            <span className="input-icon">
                                                ◷
                                            </span>

                                            <select
                                                id="year"
                                                name="year"
                                                value={formData.year}
                                                onChange={handleChange}
                                            >

                                                <option value="">
                                                    Select year
                                                </option>

                                                <option value="1">
                                                    1st Year
                                                </option>

                                                <option value="2">
                                                    2nd Year
                                                </option>

                                                <option value="3">
                                                    3rd Year
                                                </option>

                                                <option value="4">
                                                    4th Year
                                                </option>

                                            </select>

                                        </div>

                                    </div>

                                </div>

                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                className="auth-submit"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <span className="button-spinner"></span>
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create{" "}
                                        {formData.role === "ADMIN"
                                            ? "Admin"
                                            : "Student"}{" "}
                                        Account

                                        <span>→</span>
                                    </>
                                )}

                            </button>

                        </form>

                        <p className="switch-auth">

                            Already have an account?

                            <Link to="/login">
                                Sign in
                            </Link>

                        </p>

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

export default Register;
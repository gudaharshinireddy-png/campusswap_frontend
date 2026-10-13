import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    return (

        <nav className="navbar">

            <div className="navbar-inner">


                {/* LOGO */}

                <Link
                    to="/dashboard"
                    className="navbar-logo"
                >

                    <span className="logo-icon">
                        C
                    </span>

                    <span>
                        Campus<span>Swap</span>
                    </span>

                </Link>


                {/* NAVIGATION */}

                {user ? (

                    <div className="navbar-right">


                        {/* DASHBOARD */}

                        <Link
                            to="/dashboard"
                            className="nav-link"
                        >
                            Dashboard
                        </Link>


                        {/* ================================
                            STUDENT LINKS
                            ================================= */}

                        {user.role === "STUDENT" && (

                            <>

                                <Link
                                    to="/donations"
                                    className="nav-link"
                                >
                                    Donations
                                </Link>


                                <Link
                                    to="/my-donations"
                                    className="nav-link"
                                >
                                    My Donations
                                </Link>


                                <Link
                                    to="/my-requests"
                                    className="nav-link"
                                >
                                    My Requests
                                </Link>


                                <Link
                                    to="/reports"
                                    className="nav-link"
                                >
                                    Reports
                                </Link>

                            </>

                        )}


                        {/* ================================
                            ADMIN LINKS
                            ================================= */}

                        {user.role === "ADMIN" && (

                            <>

                                <Link
                                    to="/users"
                                    className="nav-link"
                                >
                                    Users
                                </Link>


                                <Link
                                    to="/admin/requests"
                                    className="nav-link"
                                >
                                    Requests
                                </Link>


                                <Link
                                    to="/reports"
                                    className="nav-link"
                                >
                                    Reports
                                </Link>

                            </>

                        )}


                        {/* PROFILE */}

                        <Link
                            to="/profile"
                            className="nav-link"
                        >
                            Profile
                        </Link>


                        {/* USER INFORMATION */}

                        <div className="navbar-user">

                            <div className="navbar-avatar">

                                {user.name
                                    ? user.name
                                        .charAt(0)
                                        .toUpperCase()
                                    : "U"}

                            </div>


                            <div className="navbar-user-info">

                                <strong>
                                    {user.name}
                                </strong>

                                <small>
                                    {user.role}
                                </small>

                            </div>

                        </div>


                        {/* LOGOUT */}

                        <button
                            className="nav-logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                ) : (

                    <div className="navbar-right">

                        <Link
                            to="/login"
                            className="nav-link"
                        >
                            Login
                        </Link>


                        <Link
                            to="/register"
                            className="nav-button"
                        >
                            Get Started
                        </Link>

                    </div>

                )}

            </div>

        </nav>

    );
}


export default Navbar;
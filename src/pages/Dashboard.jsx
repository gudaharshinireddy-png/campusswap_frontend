import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Dashboard() {

    const { user } = useAuth();

    const isAdmin =
        user?.role === "ADMIN";


    return (

        <div className="app-shell">

            <Navbar />


            <main className="dashboard-page">

                <div className="dashboard-container">


                    {/* =================================================
                        HERO
                        ================================================= */}

                    <section className="dashboard-hero">

                        <div className="dashboard-hero-content">

                            <span className="dashboard-eyebrow">
                                CAMPUS COMMUNITY
                            </span>


                            <h1>

                                Welcome back,{" "}

                                <span>
                                    {user?.name || "Student"}
                                </span>

                                👋

                            </h1>


                            <p>

                                {isAdmin

                                    ? "Manage the CampusSwap community and keep the platform safe."

                                    : "Give useful items a second life and discover things your fellow students are sharing."

                                }

                            </p>

                        </div>


                        <div className="dashboard-hero-shape">

                            <div className="hero-floating-card">

                                <span>
                                    ♻️
                                </span>

                                <strong>
                                    Share more.
                                </strong>

                                <small>
                                    Waste less.
                                </small>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        STUDENT DASHBOARD
                        ================================================= */}

                    {!isAdmin && (

                        <>

                            {/* QUICK ACTIONS */}

                            <section className="dashboard-section">

                                <div className="section-heading">

                                    <div>

                                        <span className="page-eyebrow">
                                            QUICK ACTIONS
                                        </span>

                                        <h2>
                                            What would you like to do?
                                        </h2>

                                    </div>

                                </div>


                                <div className="quick-actions-grid">


                                    {/* FIND DONATIONS */}

                                    <Link
                                        to="/donations"
                                        className="quick-action-card"
                                    >

                                        <div className="quick-action-icon purple">
                                            🔎
                                        </div>


                                        <div>

                                            <h3>
                                                Find Donations
                                            </h3>

                                            <p>
                                                Browse useful items shared by students.
                                            </p>

                                        </div>


                                        <span className="action-arrow">
                                            →
                                        </span>

                                    </Link>


                                    {/* DONATE */}

                                    <Link
                                        to="/add-donation"
                                        className="quick-action-card"
                                    >

                                        <div className="quick-action-icon green">
                                            🎁
                                        </div>


                                        <div>

                                            <h3>
                                                Donate an Item
                                            </h3>

                                            <p>
                                                Share something you no longer need.
                                            </p>

                                        </div>


                                        <span className="action-arrow">
                                            →
                                        </span>

                                    </Link>


                                    {/* MY DONATIONS */}

                                    <Link
                                        to="/my-donations"
                                        className="quick-action-card"
                                    >

                                        <div className="quick-action-icon orange">
                                            📦
                                        </div>


                                        <div>

                                            <h3>
                                                My Donations
                                            </h3>

                                            <p>
                                                Manage the items you have donated.
                                            </p>

                                        </div>


                                        <span className="action-arrow">
                                            →
                                        </span>

                                    </Link>


                                    {/* MY REQUESTS */}

                                    <Link
                                        to="/my-requests"
                                        className="quick-action-card"
                                    >

                                        <div className="quick-action-icon blue">
                                            📩
                                        </div>


                                        <div>

                                            <h3>
                                                My Requests
                                            </h3>

                                            <p>
                                                Track items you have requested.
                                            </p>

                                        </div>


                                        <span className="action-arrow">
                                            →
                                        </span>

                                    </Link>


                                </div>

                            </section>


                            {/* HOW IT WORKS */}

                            <section className="how-section">

                                <div className="section-heading">

                                    <div>

                                        <span className="page-eyebrow">
                                            SIMPLE PROCESS
                                        </span>

                                        <h2>
                                            How CampusSwap works
                                        </h2>

                                    </div>

                                </div>


                                <div className="steps-grid">


                                    {/* STEP 1 */}

                                    <div className="step-card">

                                        <span className="step-number">
                                            01
                                        </span>


                                        <div className="step-icon">
                                            🎁
                                        </div>


                                        <h3>
                                            Donate
                                        </h3>


                                        <p>
                                            Post an item you no longer need.
                                        </p>

                                    </div>


                                    {/* STEP 2 */}

                                    <div className="step-card">

                                        <span className="step-number">
                                            02
                                        </span>


                                        <div className="step-icon">
                                            📩
                                        </div>


                                        <h3>
                                            Request
                                        </h3>


                                        <p>
                                            Another student requests the item.
                                        </p>

                                    </div>


                                    {/* STEP 3 */}

                                    <div className="step-card">

                                        <span className="step-number">
                                            03
                                        </span>


                                        <div className="step-icon">
                                            🤝
                                        </div>


                                        <h3>
                                            Give
                                        </h3>


                                        <p>
                                            Accept the request and hand over the item.
                                        </p>

                                    </div>


                                    {/* STEP 4 */}

                                    <div className="step-card">

                                        <span className="step-number">
                                            04
                                        </span>


                                        <div className="step-icon">
                                            ✨
                                        </div>


                                        <h3>
                                            Complete
                                        </h3>


                                        <p>
                                            Mark the donation as completed.
                                        </p>

                                    </div>


                                </div>

                            </section>

                        </>
                    )}


                    {/* =================================================
                        ADMIN DASHBOARD
                        ================================================= */}

                    {isAdmin && (

                        <section className="dashboard-section">


                            <div className="section-heading">

                                <div>

                                    <span className="page-eyebrow">
                                        ADMINISTRATION
                                    </span>


                                    <h2>
                                        Manage CampusSwap
                                    </h2>

                                </div>

                            </div>


                            <div className="quick-actions-grid">


                                {/* MANAGE USERS */}

                                <Link
                                    to="/users"
                                    className="quick-action-card"
                                >

                                    <div className="quick-action-icon purple">
                                        👥
                                    </div>


                                    <div>

                                        <h3>
                                            Manage Users
                                        </h3>


                                        <p>
                                            View, block and manage student accounts.
                                        </p>

                                    </div>


                                    <span className="action-arrow">
                                        →
                                    </span>

                                </Link>


                                {/* MANAGE REQUESTS */}

                                <Link
                                    to="/admin/requests"
                                    className="quick-action-card"
                                >

                                    <div className="quick-action-icon blue">
                                        📩
                                    </div>


                                    <div>

                                        <h3>
                                            Manage Requests
                                        </h3>


                                        <p>
                                            Review donation requests from students.
                                        </p>

                                    </div>


                                    <span className="action-arrow">
                                        →
                                    </span>

                                </Link>


                                {/* MANAGE REPORTS */}

                                <Link
                                    to="/reports"
                                    className="quick-action-card"
                                >

                                    <div className="quick-action-icon orange">
                                        🛡️
                                    </div>


                                    <div>

                                        <h3>
                                            Manage Reports
                                        </h3>


                                        <p>
                                            Review community reports and inappropriate content.
                                        </p>

                                    </div>


                                    <span className="action-arrow">
                                        →
                                    </span>

                                </Link>


                                {/* ADMIN PROFILE */}

                                <Link
                                    to="/profile"
                                    className="quick-action-card"
                                >

                                    <div className="quick-action-icon green">
                                        👤
                                    </div>


                                    <div>

                                        <h3>
                                            Admin Profile
                                        </h3>


                                        <p>
                                            Manage your account information.
                                        </p>

                                    </div>


                                    <span className="action-arrow">
                                        →
                                    </span>

                                </Link>


                            </div>

                        </section>

                    )}

                </div>

            </main>


            <Footer />

        </div>

    );
}


export default Dashboard;
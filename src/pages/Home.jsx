import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">

            {/* Background Effects */}
            <div className="background-orb orb-one"></div>
            <div className="background-orb orb-two"></div>
            <div className="background-grid"></div>

            {/* Navigation */}
            <nav className="landing-navbar">
                <div className="brand">
                    <div className="brand-icon">C</div>
                    <span>Campus<span>Swap</span></span>
                </div>

                <div className="nav-actions">
                    <Link to="/login" className="nav-login">
                        Login
                    </Link>

                    <Link to="/register" className="nav-register">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="hero-section">

                <div className="hero-content">

                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        Built for Campus Communities
                    </div>

                    <h1>
                        Give More.
                        <br />
                        <span>Share More.</span>
                    </h1>

                    <p className="hero-description">
                        CampusSwap makes it simple for students to donate
                        useful items they no longer need and help fellow
                        students find what they need.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/login" className="primary-button">
                            Login
                            <span>→</span>
                        </Link>

                        <Link to="/register" className="secondary-button">
                            Create Account
                        </Link>
                    </div>

                    <div className="hero-trust">
                        <div className="trust-avatars">
                            <span>👩🏻</span>
                            <span>👨🏻</span>
                            <span>👩🏽</span>
                            <span>👨🏾</span>
                        </div>

                        <div>
                            <strong>Campus community</strong>
                            <p>Share. Donate. Help.</p>
                        </div>
                    </div>

                </div>

                {/* Hero Visual */}
                <div className="hero-visual">

                    <div className="floating-card card-top">
                        <div className="floating-icon">🎁</div>
                        <div>
                            <strong>Donation Added</strong>
                            <span>Engineering Book</span>
                        </div>
                        <div className="success-check">✓</div>
                    </div>

                    <div className="main-glass-card">

                        <div className="card-glow"></div>

                        <div className="mockup-header">
                            <div>
                                <small>CampusSwap</small>
                                <h3>Find something useful</h3>
                            </div>

                            <div className="mockup-avatar">
                                U
                            </div>
                        </div>

                        <div className="mockup-search">
                            <span>⌕</span>
                            <span>Search donated items...</span>
                        </div>

                        <div className="mockup-items">

                            <div className="mock-item">
                                <div className="item-image book-image">
                                    📚
                                </div>

                                <div className="item-info">
                                    <strong>Engineering Books</strong>
                                    <span>Books • Good condition</span>
                                    <small>Available</small>
                                </div>

                                <button>View</button>
                            </div>

                            <div className="mock-item">
                                <div className="item-image calculator-image">
                                    🧮
                                </div>

                                <div className="item-info">
                                    <strong>Scientific Calculator</strong>
                                    <span>Study • Excellent</span>
                                    <small>Available</small>
                                </div>

                                <button>View</button>
                            </div>

                            <div className="mock-item">
                                <div className="item-image notes-image">
                                    📝
                                </div>

                                <div className="item-info">
                                    <strong>Study Notes</strong>
                                    <span>Notes • Good condition</span>
                                    <small>Available</small>
                                </div>

                                <button>View</button>
                            </div>

                        </div>

                    </div>

                    <div className="floating-card card-bottom">
                        <div className="notification-icon">♡</div>
                        <div>
                            <strong>Helping Students</strong>
                            <span>One donation at a time</span>
                        </div>
                    </div>

                </div>

            </main>

            {/* Bottom Features */}
            <section className="landing-features">

                <div className="feature">
                    <div className="feature-icon">♢</div>
                    <div>
                        <strong>Donate Freely</strong>
                        <span>No payment or exchange required</span>
                    </div>
                </div>

                <div className="feature">
                    <div className="feature-icon">⌕</div>
                    <div>
                        <strong>Find What You Need</strong>
                        <span>Discover useful campus items</span>
                    </div>
                </div>

                <div className="feature">
                    <div className="feature-icon">♡</div>
                    <div>
                        <strong>Help Your Community</strong>
                        <span>Make a meaningful difference</span>
                    </div>
                </div>

            </section>

        </div>
    );
}

export default Home;
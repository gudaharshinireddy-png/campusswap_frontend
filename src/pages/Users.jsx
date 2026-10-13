import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Users() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [actionLoading, setActionLoading] =
        useState(null);


    /* =====================================================
       LOAD USERS
       ===================================================== */

    const fetchUsers = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get("/users");

            setUsers(response.data);

        } catch (error) {

            console.error(
                "Error loading users:",
                error
            );

            setError(
                "Unable to load users."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchUsers();

    }, []);


    /* =====================================================
       BLOCK / UNBLOCK
       ===================================================== */

    const handleBlockToggle = async (user) => {

        try {

            setActionLoading(user.id);

            setError("");
            setMessage("");

            if (user.blocked) {

                await api.put(
                    `/users/${user.id}/unblock`
                );

                setMessage(
                    `${user.name} has been unblocked.`
                );

            } else {

                await api.put(
                    `/users/${user.id}/block`
                );

                setMessage(
                    `${user.name} has been blocked.`
                );

            }

            await fetchUsers();

        } catch (error) {

            console.error(
                "Error updating user status:",
                error
            );

            setError(
                error.response?.data ||
                "Unable to update user status."
            );

        } finally {

            setActionLoading(null);

        }
    };


    /* =====================================================
       DELETE USER
       ===================================================== */

    const handleDelete = async (user) => {

        const confirmed =
            window.confirm(
                `Are you sure you want to delete ${user.name}?`
            );

        if (!confirmed) {
            return;
        }


        try {

            setActionLoading(user.id);

            setError("");
            setMessage("");


            await api.delete(
                `/users/${user.id}`
            );


            setUsers(
                (previous) =>
                    previous.filter(
                        (currentUser) =>
                            currentUser.id !==
                            user.id
                    )
            );


            setMessage(
                `${user.name} has been deleted.`
            );

        } catch (error) {

            console.error(
                "Error deleting user:",
                error
            );

            setError(
                error.response?.data ||
                "Unable to delete user."
            );

        } finally {

            setActionLoading(null);

        }
    };


    /* =====================================================
       COUNTS
       ===================================================== */

    const studentCount =
        users.filter(
            (user) =>
                user.role === "STUDENT"
        ).length;


    const adminCount =
        users.filter(
            (user) =>
                user.role === "ADMIN"
        ).length;


    const blockedCount =
        users.filter(
            (user) =>
                user.blocked === true
        ).length;


    return (

        <div className="app-shell">

            <Navbar />


            <main className="users-page">

                <div className="users-container">


                    {/* =================================================
                        HEADER
                        ================================================= */}

                    <section className="users-header">

                        <div>

                            <span className="page-eyebrow">
                                ADMINISTRATION
                            </span>

                            <h1>
                                Manage
                                <span> users.</span>
                            </h1>

                            <p>
                                View and manage CampusSwap
                                student and administrator accounts.
                            </p>

                        </div>


                        <div className="users-total-card">

                            <span>
                                TOTAL USERS
                            </span>

                            <strong>
                                {users.length}
                            </strong>

                        </div>

                    </section>


                    {/* =================================================
                        MESSAGES
                        ================================================= */}

                    {message && (

                        <div className="users-success-message">

                            <span>
                                ✓
                            </span>

                            <p>
                                {message}
                            </p>

                            <button
                                onClick={() =>
                                    setMessage("")
                                }
                            >
                                ×
                            </button>

                        </div>

                    )}


                    {error && (

                        <div className="users-error-message">

                            <span>
                                ⚠
                            </span>

                            <p>
                                {error}
                            </p>

                            <button
                                onClick={() =>
                                    setError("")
                                }
                            >
                                ×
                            </button>

                        </div>

                    )}


                    {/* =================================================
                        STATISTICS
                        ================================================= */}

                    {!loading && (

                        <section className="users-stats">

                            <div className="users-stat-card">

                                <span>
                                    STUDENTS
                                </span>

                                <strong>
                                    {studentCount}
                                </strong>

                            </div>


                            <div className="users-stat-card">

                                <span>
                                    ADMINS
                                </span>

                                <strong>
                                    {adminCount}
                                </strong>

                            </div>


                            <div className="users-stat-card">

                                <span>
                                    BLOCKED
                                </span>

                                <strong>
                                    {blockedCount}
                                </strong>

                            </div>


                            <div className="users-stat-card">

                                <span>
                                    ACTIVE
                                </span>

                                <strong>
                                    {users.length -
                                        blockedCount}
                                </strong>

                            </div>

                        </section>

                    )}


                    {/* =================================================
                        USERS
                        ================================================= */}

                    <section className="users-section">

                        <div className="users-section-heading">

                            <div>

                                <span>
                                    USER ACCOUNTS
                                </span>

                                <h2>
                                    All CampusSwap users
                                </h2>

                            </div>

                        </div>


                        {loading ? (

                            <div className="users-loading">

                                <div className="loading-spinner"></div>

                                <p>
                                    Loading users...
                                </p>

                            </div>

                        ) : users.length === 0 ? (

                            <div className="users-empty">

                                <div className="users-empty-icon">
                                    👥
                                </div>

                                <h3>
                                    No users found
                                </h3>

                                <p>
                                    There are currently
                                    no users in the system.
                                </p>

                            </div>

                        ) : (

                            <div className="users-table-wrapper">

                                <table className="users-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                USER
                                            </th>

                                            <th>
                                                EMAIL
                                            </th>

                                            <th>
                                                ROLE
                                            </th>

                                            <th>
                                                DEPARTMENT
                                            </th>

                                            <th>
                                                YEAR
                                            </th>

                                            <th>
                                                STATUS
                                            </th>

                                            <th>
                                                ACTIONS
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {users.map(
                                            (currentUser) => (

                                                <tr
                                                    key={
                                                        currentUser.id
                                                    }
                                                >

                                                    {/* USER */}

                                                    <td>

                                                        <div className="user-table-profile">

                                                            <div className="user-table-avatar">

                                                                {currentUser.name
                                                                    ? currentUser.name
                                                                        .charAt(0)
                                                                        .toUpperCase()
                                                                    : "U"}

                                                            </div>

                                                            <div>

                                                                <strong>
                                                                    {
                                                                        currentUser.name
                                                                    }
                                                                </strong>

                                                                <small>
                                                                    ID: #
                                                                    {
                                                                        currentUser.id
                                                                    }
                                                                </small>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* EMAIL */}

                                                    <td>

                                                        <span className="user-email">
                                                            {
                                                                currentUser.email
                                                            }
                                                        </span>

                                                    </td>


                                                    {/* ROLE */}

                                                    <td>

                                                        <span
                                                            className={
                                                                `user-role-badge ${
                                                                    currentUser.role ===
                                                                    "ADMIN"
                                                                        ? "admin"
                                                                        : "student"
                                                                }`
                                                            }
                                                        >
                                                            {
                                                                currentUser.role
                                                            }
                                                        </span>

                                                    </td>


                                                    {/* DEPARTMENT */}

                                                    <td>

                                                        {
                                                            currentUser.department ||
                                                            "—"
                                                        }

                                                    </td>


                                                    {/* YEAR */}

                                                    <td>

                                                        {
                                                            currentUser.year ||
                                                            "—"
                                                        }

                                                    </td>


                                                    {/* STATUS */}

                                                    <td>

                                                        <span
                                                            className={
                                                                currentUser.blocked
                                                                    ? "user-status blocked"
                                                                    : "user-status active"
                                                            }
                                                        >

                                                            <span className="status-dot">
                                                                ●
                                                            </span>

                                                            {currentUser.blocked
                                                                ? "Blocked"
                                                                : "Active"}

                                                        </span>

                                                    </td>


                                                    {/* ACTIONS */}

                                                    <td>

                                                        <div className="user-table-actions">

                                                            <button
                                                                className={
                                                                    currentUser.blocked
                                                                        ? "user-action-button unblock"
                                                                        : "user-action-button block"
                                                                }
                                                                disabled={
                                                                    actionLoading ===
                                                                    currentUser.id
                                                                }
                                                                onClick={() =>
                                                                    handleBlockToggle(
                                                                        currentUser
                                                                    )
                                                                }
                                                            >

                                                                {currentUser.blocked
                                                                    ? "Unblock"
                                                                    : "Block"}

                                                            </button>


                                                            <button
                                                                className="user-action-button delete"
                                                                disabled={
                                                                    actionLoading ===
                                                                    currentUser.id
                                                                }
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        currentUser
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </section>

                </div>

            </main>


            <Footer />

        </div>

    );
}

export default Users;
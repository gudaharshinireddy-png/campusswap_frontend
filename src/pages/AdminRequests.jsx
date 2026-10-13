import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function AdminRequests() {

    const [requests, setRequests] = useState([]);

    const [items, setItems] = useState({});
    const [users, setUsers] = useState({});

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [actionLoading, setActionLoading] = useState(null);


    /* =====================================================
       LOAD ALL REQUESTS
       ===================================================== */

    const fetchRequests = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get("/requests");

            const requestData =
                response.data;

            setRequests(requestData);


            const itemDetails = {};
            const userDetails = {};


            for (const request of requestData) {

                /* LOAD ITEM */

                try {

                    const itemResponse =
                        await api.get(
                            `/items/${request.itemId}`
                        );

                    itemDetails[
                        request.itemId
                    ] = itemResponse.data;

                } catch (itemError) {

                    console.error(
                        "Unable to load item:",
                        itemError
                    );

                }


                /* LOAD REQUESTER */

                try {

                    const userResponse =
                        await api.get(
                            `/users/${request.requesterId}`
                        );

                    userDetails[
                        request.requesterId
                    ] = userResponse.data;

                } catch (userError) {

                    console.error(
                        "Unable to load requester:",
                        userError
                    );

                }

            }


            setItems(itemDetails);
            setUsers(userDetails);

        } catch (error) {

            console.error(
                "Error loading requests:",
                error
            );

            setError(
                "Unable to load donation requests."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchRequests();

    }, []);


    /* =====================================================
       UPDATE REQUEST
       ===================================================== */

    const handleAction = async (
        requestId,
        action
    ) => {

        try {

            setActionLoading(requestId);

            setError("");
            setMessage("");


            await api.put(
                `/requests/${requestId}/${action}`
            );


            if (action === "accept") {

                setMessage(
                    "Request accepted successfully."
                );

            } else if (action === "reject") {

                setMessage(
                    "Request rejected successfully."
                );

            } else if (action === "complete") {

                setMessage(
                    "Request marked as completed."
                );

            }


            await fetchRequests();

        } catch (error) {

            console.error(
                `Error performing ${action}:`,
                error
            );

            setError(
                error.response?.data ||
                "Unable to update the request."
            );

        } finally {

            setActionLoading(null);

        }
    };


    /* =====================================================
       DELETE REQUEST
       ===================================================== */

    const handleDelete = async (requestId) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this request?"
            );


        if (!confirmed) {
            return;
        }


        try {

            setActionLoading(requestId);

            setError("");
            setMessage("");


            await api.delete(
                `/requests/${requestId}`
            );


            setRequests((current) =>
                current.filter(
                    (request) =>
                        request.id !== requestId
                )
            );


            setMessage(
                "Request deleted successfully."
            );

        } catch (error) {

            console.error(
                "Error deleting request:",
                error
            );

            setError(
                "Unable to delete the request."
            );

        } finally {

            setActionLoading(null);

        }
    };


    /* =====================================================
       COUNTS
       ===================================================== */

    const requestedCount =
        requests.filter(
            (request) =>
                request.status === "REQUESTED"
        ).length;


    const acceptedCount =
        requests.filter(
            (request) =>
                request.status === "ACCEPTED"
        ).length;


    const rejectedCount =
        requests.filter(
            (request) =>
                request.status === "REJECTED"
        ).length;


    const completedCount =
        requests.filter(
            (request) =>
                request.status === "COMPLETED"
        ).length;


    /* =====================================================
       STATUS CLASS
       ===================================================== */

    const getStatusClass = (status) => {

        switch (status) {

            case "REQUESTED":
                return "admin-status-requested";

            case "ACCEPTED":
                return "admin-status-accepted";

            case "REJECTED":
                return "admin-status-rejected";

            case "COMPLETED":
                return "admin-status-completed";

            default:
                return "admin-status-default";

        }
    };


    return (

        <div className="app-shell">

            <Navbar />


            <main className="admin-requests-page">

                <div className="admin-requests-container">


                    {/* =================================================
                        HEADER
                        ================================================= */}

                    <section className="admin-requests-header">

                        <div>

                            <span className="page-eyebrow">
                                ADMINISTRATION
                            </span>

                            <h1>
                                Manage Requests
                            </h1>

                            <p>
                                Monitor and manage all
                                donation requests across
                                CampusSwap.
                            </p>

                        </div>


                        <div className="admin-request-total">

                            <span>
                                TOTAL
                            </span>

                            <strong>
                                {requests.length}
                            </strong>

                        </div>

                    </section>


                    {/* =================================================
                        MESSAGES
                        ================================================= */}

                    {message && (

                        <div className="admin-success-message">

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

                        <div className="admin-error-message">

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

                        <section className="admin-request-stats">


                            <div className="admin-request-stat">

                                <span>
                                    PENDING
                                </span>

                                <strong>
                                    {requestedCount}
                                </strong>

                            </div>


                            <div className="admin-request-stat">

                                <span>
                                    ACCEPTED
                                </span>

                                <strong>
                                    {acceptedCount}
                                </strong>

                            </div>


                            <div className="admin-request-stat">

                                <span>
                                    REJECTED
                                </span>

                                <strong>
                                    {rejectedCount}
                                </strong>

                            </div>


                            <div className="admin-request-stat">

                                <span>
                                    COMPLETED
                                </span>

                                <strong>
                                    {completedCount}
                                </strong>

                            </div>


                        </section>

                    )}


                    {/* =================================================
                        REQUEST LIST
                        ================================================= */}

                    <section className="admin-request-section">

                        <div className="admin-request-section-header">

                            <div>

                                <span>
                                    ALL REQUESTS
                                </span>

                                <h2>
                                    Donation activity
                                </h2>

                            </div>

                        </div>


                        {loading ? (

                            <div className="admin-request-loading">

                                <div className="loading-spinner"></div>

                                <p>
                                    Loading requests...
                                </p>

                            </div>

                        ) : requests.length === 0 ? (

                            <div className="admin-request-empty">

                                <div className="admin-request-empty-icon">
                                    📩
                                </div>

                                <h3>
                                    No requests found
                                </h3>

                                <p>
                                    There are currently no
                                    donation requests in
                                    the system.
                                </p>

                            </div>

                        ) : (

                            <div className="admin-request-list">

                                {requests.map(
                                    (request) => {

                                        const item =
                                            items[
                                                request.itemId
                                            ];

                                        const requester =
                                            users[
                                                request.requesterId
                                            ];


                                        return (

                                            <div
                                                className="admin-request-card"
                                                key={
                                                    request.id
                                                }
                                            >


                                                {/* ITEM */}

                                                <div className="admin-request-item">

                                                    <div className="admin-request-image">

                                                        {item?.imageUrl ? (

                                                            <img
                                                                src={
                                                                    item.imageUrl
                                                                }
                                                                alt={
                                                                    item.title ||
                                                                    "Item"
                                                                }
                                                            />

                                                        ) : (

                                                            <span>
                                                                📦
                                                            </span>

                                                        )}

                                                    </div>


                                                    <div>

                                                        <span className="admin-card-label">
                                                            ITEM
                                                        </span>

                                                        <h3>
                                                            {
                                                                item?.title ||
                                                                `Item #${request.itemId}`
                                                            }
                                                        </h3>

                                                        <p>
                                                            {
                                                                item?.category ||
                                                                "Donation"
                                                            }
                                                        </p>

                                                    </div>

                                                </div>


                                                {/* REQUESTER */}

                                                <div className="admin-request-person">

                                                    <span className="admin-card-label">
                                                        REQUESTER
                                                    </span>

                                                    <strong>
                                                        {
                                                            requester?.name ||
                                                            `User #${request.requesterId}`
                                                        }
                                                    </strong>

                                                    <small>
                                                        {
                                                            requester?.email ||
                                                            "Student"
                                                        }
                                                    </small>

                                                </div>


                                                {/* STATUS */}

                                                <div className="admin-request-status-area">

                                                    <span className="admin-card-label">
                                                        STATUS
                                                    </span>

                                                    <span
                                                        className={`admin-request-status ${getStatusClass(
                                                            request.status
                                                        )}`}
                                                    >
                                                        {
                                                            request.status ||
                                                            "REQUESTED"
                                                        }
                                                    </span>

                                                </div>


                                                {/* MESSAGE */}

                                                <div className="admin-request-message">

                                                    <span className="admin-card-label">
                                                        MESSAGE
                                                    </span>

                                                    <p>
                                                        {
                                                            request.message ||
                                                            "No message provided."
                                                        }
                                                    </p>

                                                </div>


                                                {/* ACTIONS */}

                                                <div className="admin-request-actions">


                                                    {request.status ===
                                                        "REQUESTED" && (

                                                        <>

                                                            <button
                                                                className="admin-request-btn accept"
                                                                disabled={
                                                                    actionLoading ===
                                                                    request.id
                                                                }
                                                                onClick={() =>
                                                                    handleAction(
                                                                        request.id,
                                                                        "accept"
                                                                    )
                                                                }
                                                            >
                                                                Accept
                                                            </button>


                                                            <button
                                                                className="admin-request-btn reject"
                                                                disabled={
                                                                    actionLoading ===
                                                                    request.id
                                                                }
                                                                onClick={() =>
                                                                    handleAction(
                                                                        request.id,
                                                                        "reject"
                                                                    )
                                                                }
                                                            >
                                                                Reject
                                                            </button>

                                                        </>

                                                    )}


                                                    {request.status ===
                                                        "ACCEPTED" && (

                                                        <button
                                                            className="admin-request-btn complete"
                                                            disabled={
                                                                actionLoading ===
                                                                request.id
                                                            }
                                                            onClick={() =>
                                                                handleAction(
                                                                    request.id,
                                                                    "complete"
                                                                )
                                                            }
                                                        >
                                                            Complete
                                                        </button>

                                                    )}


                                                    <button
                                                        className="admin-request-btn delete"
                                                        disabled={
                                                            actionLoading ===
                                                            request.id
                                                        }
                                                        onClick={() =>
                                                            handleDelete(
                                                                request.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>


                                                </div>

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        )}

                    </section>

                </div>

            </main>


            <Footer />

        </div>

    );
}

export default AdminRequests;
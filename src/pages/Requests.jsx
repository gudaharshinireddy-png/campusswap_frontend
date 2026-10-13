import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import RequestCard from "../components/RequestCard";
import { useAuth } from "../context/AuthContext";

function Requests() {

    const { user } = useAuth();

    const [requests, setRequests] = useState([]);
    const [items, setItems] = useState({});
    const [users, setUsers] = useState({});

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    // --------------------------------------------------
    // CHECK LOGGED-IN USER
    // --------------------------------------------------

    useEffect(() => {

        console.log(
            "CURRENT LOGGED-IN USER:",
            user
        );

        if (user?.id) {
            fetchRequests(user.id);
        } else {
            setLoading(false);
        }

    }, [user]);


    // --------------------------------------------------
    // LOAD REQUESTS
    // --------------------------------------------------

    const fetchRequests = async (userId) => {

        try {

            setLoading(true);
            setError("");

            console.log(
                "Loading requests for owner ID:",
                userId
            );


            const response =
                await api.get(
                    `/requests/owner/${userId}`
                );


            console.log(
                "Requests received from backend:",
                response.data
            );


            const requestData =
                response.data || [];


            setRequests(requestData);


            // --------------------------------------------------
            // LOAD ITEM DETAILS
            // --------------------------------------------------

            const itemDetails = {};

            // --------------------------------------------------
            // LOAD REQUESTER DETAILS
            // --------------------------------------------------

            const userDetails = {};


            for (const request of requestData) {


                // ----------------------------------------------
                // ITEM
                // ----------------------------------------------

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


                // ----------------------------------------------
                // REQUESTER
                // ----------------------------------------------

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
                error.response?.data ||
                "Unable to load donation requests."
            );


        } finally {

            setLoading(false);

        }

    };


    // --------------------------------------------------
    // ACCEPT REQUEST
    // --------------------------------------------------

    const handleAccept = async (requestId) => {

        try {

            setError("");
            setMessage("");


            await api.put(
                `/requests/${requestId}/accept`
            );


            setMessage(
                "Request accepted successfully."
            );


            if (user?.id) {
                fetchRequests(user.id);
            }


        } catch (error) {

            console.error(
                "Error accepting request:",
                error
            );


            setError(
                error.response?.data ||
                "Unable to accept request."
            );

        }

    };


    // --------------------------------------------------
    // REJECT REQUEST
    // --------------------------------------------------

    const handleReject = async (requestId) => {

        try {

            setError("");
            setMessage("");


            await api.put(
                `/requests/${requestId}/reject`
            );


            setMessage(
                "Request rejected."
            );


            if (user?.id) {
                fetchRequests(user.id);
            }


        } catch (error) {

            console.error(
                "Error rejecting request:",
                error
            );


            setError(
                error.response?.data ||
                "Unable to reject request."
            );

        }

    };


    // --------------------------------------------------
    // COMPLETE REQUEST
    // --------------------------------------------------

    const handleComplete = async (requestId) => {

        try {

            setError("");
            setMessage("");


            await api.put(
                `/requests/${requestId}/complete`
            );


            setMessage(
                "Request marked as completed."
            );


            if (user?.id) {
                fetchRequests(user.id);
            }


        } catch (error) {

            console.error(
                "Error completing request:",
                error
            );


            setError(
                error.response?.data ||
                "Unable to complete request."
            );

        }

    };


    // --------------------------------------------------
    // STATISTICS
    // --------------------------------------------------

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


    const completedCount =
        requests.filter(
            (request) =>
                request.status === "COMPLETED"
        ).length;


    // --------------------------------------------------
    // PAGE
    // --------------------------------------------------

    return (

        <div className="requests-page">

            <div className="requests-container">


                {/* ----------------------------------------
                    HEADER
                ---------------------------------------- */}

                <section className="requests-header">

                    <div>

                        <span className="page-label">
                            DONATION REQUESTS
                        </span>


                        <h1>
                            Manage your
                            <span> requests.</span>
                        </h1>


                        <p>
                            Review requests from students
                            who want to receive your donated
                            items.
                        </p>

                    </div>


                    <Link
                        to="/my-donations"
                        className="donations-add-button"
                    >
                        My Donations
                    </Link>

                </section>


                {/* ----------------------------------------
                    SUCCESS MESSAGE
                ---------------------------------------- */}

                {message && (

                    <div className="donation-message">

                        <span>
                            ✓
                        </span>


                        {message}


                        <button
                            onClick={() =>
                                setMessage("")
                            }
                        >
                            ×
                        </button>

                    </div>

                )}


                {/* ----------------------------------------
                    ERROR MESSAGE
                ---------------------------------------- */}

                {error && (

                    <div className="my-donations-error">

                        ⚠ {error}


                        <button
                            onClick={() =>
                                setError("")
                            }
                        >
                            ×
                        </button>

                    </div>

                )}


                {/* ----------------------------------------
                    STATISTICS
                ---------------------------------------- */}

                {!loading && (

                    <div className="request-stats">


                        <div className="request-stat-card">

                            <span>
                                TOTAL REQUESTS
                            </span>


                            <strong>
                                {requests.length}
                            </strong>

                        </div>


                        <div className="request-stat-card">

                            <span>
                                PENDING
                            </span>


                            <strong>
                                {requestedCount}
                            </strong>

                        </div>


                        <div className="request-stat-card">

                            <span>
                                ACCEPTED
                            </span>


                            <strong>
                                {acceptedCount}
                            </strong>

                        </div>


                        <div className="request-stat-card">

                            <span>
                                COMPLETED
                            </span>


                            <strong>
                                {completedCount}
                            </strong>

                        </div>

                    </div>

                )}


                {/* ----------------------------------------
                    REQUEST SECTION
                ---------------------------------------- */}

                <section className="requests-section">


                    <div className="requests-section-heading">

                        <span>
                            STUDENT REQUESTS
                        </span>


                        <h2>
                            Requests for your donations
                        </h2>

                    </div>


                    {/* ------------------------------------
                        LOADING
                    ------------------------------------ */}

                    {loading ? (

                        <div className="donations-loading">

                            <div className="loading-spinner"></div>


                            <p>
                                Loading requests...
                            </p>

                        </div>


                    ) : requests.length === 0 ? (


                        /* --------------------------------
                           EMPTY
                        -------------------------------- */

                        <div className="requests-empty">

                            <div className="empty-icon">
                                📋
                            </div>


                            <h3>
                                No requests yet
                            </h3>


                            <p>
                                When students request
                                your donated items,
                                their requests will
                                appear here.
                            </p>


                            <Link
                                to="/add-donation"
                                className="empty-donation-button"
                            >
                                Donate an Item
                            </Link>

                        </div>


                    ) : (


                        /* --------------------------------
                           REQUEST LIST
                        -------------------------------- */

                        <div className="requests-management-list">

                            {requests.map(
                                (request) => (

                                    <RequestCard

                                        key={request.id}

                                        request={request}

                                        item={
                                            items[
                                                request.itemId
                                            ]
                                        }

                                        requester={
                                            users[
                                                request.requesterId
                                            ]
                                        }

                                        onAccept={
                                            handleAccept
                                        }

                                        onReject={
                                            handleReject
                                        }

                                        onComplete={
                                            handleComplete
                                        }

                                    />

                                )
                            )}

                        </div>

                    )}

                </section>

            </div>

        </div>

    );
}

export default Requests;
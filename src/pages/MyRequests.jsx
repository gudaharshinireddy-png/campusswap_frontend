import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function MyRequests() {

    const { user } = useAuth();

    const [requests, setRequests] =
        useState([]);

    const [items, setItems] =
        useState({});

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        if (user?.id) {

            fetchRequests();

        }

    }, [user]);


    const fetchRequests = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await api.get(
                    `/requests/user/${user.id}`
                );

            const requestData =
                response.data;

            setRequests(requestData);


            /*
             * Load item details for each request.
             */

            const itemDetails = {};

            for (const request of requestData) {

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

            }

            setItems(itemDetails);

        } catch (error) {

            console.error(
                "Error loading requests:",
                error
            );

            setError(
                "Unable to load your requests."
            );

        } finally {

            setLoading(false);

        }

    };


    const handleDeleteRequest =
        async (requestId) => {

            const confirmed =
                window.confirm(
                    "Do you want to cancel this request?"
                );

            if (!confirmed) {
                return;
            }


            try {

                await api.delete(
                    `/requests/${requestId}`
                );


                setRequests(
                    (previous) =>
                        previous.filter(
                            (request) =>
                                request.id !==
                                requestId
                        )
                );

            } catch (error) {

                console.error(
                    "Error deleting request:",
                    error
                );

                setError(
                    error.response?.data ||
                    "Unable to cancel request."
                );

            }

        };


    const getStatusClass = (status) => {

        switch (status) {

            case "ACCEPTED":
                return "request-status accepted";

            case "REJECTED":
                return "request-status rejected";

            case "COMPLETED":
                return "request-status completed";

            default:
                return "request-status requested";

        }

    };


    const getStatusIcon = (status) => {

        switch (status) {

            case "ACCEPTED":
                return "✓";

            case "REJECTED":
                return "×";

            case "COMPLETED":
                return "✓";

            default:
                return "•";

        }

    };


    return (

        <div className="my-requests-page">

            <div className="my-requests-container">


                {/* HEADER */}

                <section className="my-requests-header">

                    <div>

                        <span className="page-label">
                            REQUEST HISTORY
                        </span>

                        <h1>
                            My
                            <span> requests.</span>
                        </h1>

                        <p>
                            Track the donations you have
                            requested from other students.
                        </p>

                    </div>


                    <Link
                        to="/donations"
                        className="donations-add-button"
                    >
                        Browse Donations
                    </Link>

                </section>


                {/* ERROR */}

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


                {/* CONTENT */}

                {loading ? (

                    <div className="donations-loading">

                        <div className="loading-spinner"></div>

                        <p>
                            Loading your requests...
                        </p>

                    </div>

                ) : requests.length === 0 ? (

                    <div className="my-requests-empty">

                        <div className="empty-icon">
                            📋
                        </div>

                        <h3>
                            No requests yet
                        </h3>

                        <p>
                            Browse available donations
                            and request something you need.
                        </p>

                        <Link
                            to="/donations"
                            className="empty-donation-button"
                        >
                            Browse Donations
                        </Link>

                    </div>

                ) : (

                    <div className="requests-list">

                        {requests.map(
                            (request) => {

                                const item =
                                    items[
                                        request.itemId
                                    ];


                                return (

                                    <div
                                        key={request.id}
                                        className="my-request-card"
                                    >

                                        {/* ITEM IMAGE */}

                                        <div className="request-item-image">

                                            {item?.imageUrl ? (

                                                <img
                                                    src={
                                                        item.imageUrl
                                                    }
                                                    alt={
                                                        item.title
                                                    }
                                                />

                                            ) : (

                                                <span>
                                                    📦
                                                </span>

                                            )}

                                        </div>


                                        {/* DETAILS */}

                                        <div className="my-request-details">

                                            <span className="request-category">

                                                {item?.category ||
                                                    "Donation"}

                                            </span>

                                            <h3>

                                                {item?.title ||
                                                    `Item #${request.itemId}`}

                                            </h3>

                                            <p>

                                                {request.message ||
                                                    "No message provided."}

                                            </p>


                                            <div className="request-date">

                                                Requested on{" "}

                                                {request.createdAt
                                                    ? new Date(
                                                        request.createdAt
                                                    ).toLocaleDateString()
                                                    : "Recently"}

                                            </div>

                                        </div>


                                        {/* STATUS */}

                                        <div className="my-request-status-area">

                                            <div
                                                className={getStatusClass(
                                                    request.status
                                                )}
                                            >

                                                <span>
                                                    {getStatusIcon(
                                                        request.status
                                                    )}
                                                </span>

                                                {request.status}

                                            </div>


                                            {request.status ===
                                                "REQUESTED" && (

                                                <button
                                                    className="cancel-request-button"
                                                    onClick={() =>
                                                        handleDeleteRequest(
                                                            request.id
                                                        )
                                                    }
                                                >
                                                    Cancel Request
                                                </button>

                                            )}

                                        </div>

                                    </div>

                                );

                            }
                        )}

                    </div>

                )}

            </div>

        </div>

    );
}

export default MyRequests;
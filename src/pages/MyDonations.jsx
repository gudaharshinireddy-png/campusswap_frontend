import React, {
    useCallback,
    useEffect,
    useState
} from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function MyDonations() {

    const { user } = useAuth();

    const [items, setItems] = useState([]);
    const [requests, setRequests] = useState([]);
    const [users, setUsers] = useState({});

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    /*
     * LOAD DONATIONS AND REQUESTS
     */
    const loadMyDonations = useCallback(async () => {

        if (!user?.id) {
            return;
        }

        try {

            setLoading(true);
            setError("");

            // Get donations created by the logged-in user
            const itemsResponse = await api.get(
                `/items/owner/${user.id}`
            );

            const myItems = itemsResponse.data;

            setItems(myItems);


            // Get requests received for this user's donations
            const requestsResponse = await api.get(
                `/requests/owner/${user.id}`
            );

            const myRequests = requestsResponse.data;

            setRequests(myRequests);


            // Get details of students who requested donations
            const userDetails = {};

            for (const request of myRequests) {

                try {

                    const response = await api.get(
                        `/users/${request.requesterId}`
                    );

                    userDetails[request.requesterId] =
                        response.data;

                } catch (err) {

                    console.error(
                        "Could not load requester:",
                        request.requesterId
                    );

                }
            }

            setUsers(userDetails);

        } catch (err) {

            console.error(
                "Error loading my donations:",
                err
            );

            setError(
                "Unable to load your donations."
            );

        } finally {

            setLoading(false);

        }

    }, [user]);


    /*
     * LOAD DATA WHEN USER IS AVAILABLE
     */
    useEffect(() => {

        loadMyDonations();

    }, [loadMyDonations]);


    /*
     * GET REQUESTS FOR A PARTICULAR DONATION
     */
    const getRequestsForItem = (itemId) => {

        return requests.filter(
            request => request.itemId === itemId
        );

    };


    /*
     * ACCEPT REQUEST
     */
    const handleAccept = async (requestId) => {

        try {

            setMessage("");
            setError("");

            await api.put(
                `/requests/${requestId}/accept`
            );

            setMessage(
                "Donation request accepted successfully."
            );

            await loadMyDonations();

        } catch (err) {

            console.error(err);

            setError(
                "Unable to accept the request."
            );

        }

    };


    /*
     * REJECT REQUEST
     */
    const handleReject = async (requestId) => {

        try {

            setMessage("");
            setError("");

            await api.put(
                `/requests/${requestId}/reject`
            );

            setMessage(
                "Donation request rejected."
            );

            await loadMyDonations();

        } catch (err) {

            console.error(err);

            setError(
                "Unable to reject the request."
            );

        }

    };


    /*
     * COMPLETE DONATION
     */
    const handleComplete = async (requestId) => {

        try {

            setMessage("");
            setError("");

            await api.put(
                `/requests/${requestId}/complete`
            );

            setMessage(
                "Donation marked as completed."
            );

            await loadMyDonations();

        } catch (err) {

            console.error(err);

            setError(
                "Unable to complete the donation."
            );

        }

    };


    /*
     * STATUS CSS CLASS
     */
    const getStatusClass = (status) => {

        if (status === "ACCEPTED") {
            return "status-accepted";
        }

        if (status === "REJECTED") {
            return "status-rejected";
        }

        if (status === "COMPLETED") {
            return "status-completed";
        }

        return "status-requested";

    };


    return (
        <>
            <Navbar />

            <main className="my-donations-page">

                <div className="my-donations-container">


                    {/* PAGE HEADER */}

                    <div className="my-donations-header">

                        <div>

                            <h1>
                                My Donations
                            </h1>

                            <p>
                                Manage the items you donated
                                and respond to student requests.
                            </p>

                        </div>


                        <div className="donation-count-card">

                            <span>
                                Total Donations
                            </span>

                            <strong>
                                {items.length}
                            </strong>

                        </div>

                    </div>


                    {/* SUCCESS MESSAGE */}

                    {message && (

                        <div className="donation-success">

                            {message}

                        </div>

                    )}


                    {/* ERROR MESSAGE */}

                    {error && (

                        <div className="donation-error">

                            {error}

                        </div>

                    )}


                    {/* LOADING */}

                    {loading ? (

                        <div className="donation-loading">

                            Loading your donations...

                        </div>


                    ) : items.length === 0 ? (


                        /* NO DONATIONS */

                        <div className="donation-empty">

                            <div className="empty-icon">
                                🎁
                            </div>

                            <h2>
                                You haven't donated anything yet
                            </h2>

                            <p>
                                Your donated items will appear here.
                            </p>

                        </div>


                    ) : (


                        /* DONATION LIST */

                        <div className="my-donations-list">

                            {items.map((item) => {

                                const itemRequests =
                                    getRequestsForItem(item.id);

                                return (

                                    <div
                                        className="my-donation-card"
                                        key={item.id}
                                    >


                                        {/* DONATION DETAILS */}

                                        <div className="donation-item-section">


                                            {/* IMAGE */}

                                            <div className="donation-image">

                                                {item.imageUrl ? (

                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.title}
                                                    />

                                                ) : (

                                                    <div className="donation-image-placeholder">

                                                        🎁

                                                    </div>

                                                )}

                                            </div>


                                            {/* INFORMATION */}

                                            <div className="donation-item-info">

                                                <div className="donation-title-row">

                                                    <h2>
                                                        {item.title}
                                                    </h2>

                                                    <span
                                                        className={`item-status ${item.status?.toLowerCase()}`}
                                                    >
                                                        {item.status}
                                                    </span>

                                                </div>


                                                <p className="donation-description">

                                                    {item.description}

                                                </p>


                                                <div className="donation-details">

                                                    <span>
                                                        📂 {item.category}
                                                    </span>

                                                    <span>
                                                        ⭐ {item.condition}
                                                    </span>

                                                    <span>
                                                        📍 {item.location}
                                                    </span>

                                                </div>

                                            </div>

                                        </div>


                                        {/* REQUEST SECTION */}

                                        <div className="donation-requests-section">


                                            {/* REQUEST HEADER */}

                                            <div className="requests-heading">

                                                <div>

                                                    <h3>
                                                        Requests Received
                                                    </h3>

                                                    <p>
                                                        Students who requested
                                                        this donation
                                                    </p>

                                                </div>


                                                <span className="request-count">

                                                    {itemRequests.length}

                                                </span>

                                            </div>


                                            {itemRequests.length === 0 ? (


                                                /* NO REQUESTS */

                                                <div className="no-requests">

                                                    <span>
                                                        No requests yet.
                                                    </span>

                                                </div>


                                            ) : (


                                                /* REQUEST LIST */

                                                <div className="received-requests">

                                                    {itemRequests.map(
                                                        (request) => {

                                                            const requester =
                                                                users[
                                                                    request.requesterId
                                                                ];


                                                            return (

                                                                <div
                                                                    className="received-request-card"
                                                                    key={request.id}
                                                                >


                                                                    {/* REQUESTER */}

                                                                    <div className="requester-info">

                                                                        <div className="requester-avatar">

                                                                            {requester?.name
                                                                                ?.charAt(0)
                                                                                ?.toUpperCase() ||
                                                                                "S"}

                                                                        </div>


                                                                        <div>

                                                                            <h4>

                                                                                {requester?.name ||
                                                                                    "Student"}

                                                                            </h4>

                                                                            <p>

                                                                                {requester?.email ||
                                                                                    ""}

                                                                            </p>

                                                                        </div>

                                                                    </div>


                                                                    {/* MESSAGE */}

                                                                    <div className="request-message">

                                                                        <strong>
                                                                            Message
                                                                        </strong>

                                                                        <p>

                                                                            {request.message ||
                                                                                "I would like to receive this donated item."}

                                                                        </p>

                                                                    </div>


                                                                    {/* DATE */}

                                                                    <div className="request-date">

                                                                        <strong>
                                                                            Requested
                                                                        </strong>

                                                                        <p>

                                                                            {request.createdAt
                                                                                ? new Date(
                                                                                    request.createdAt
                                                                                ).toLocaleDateString()
                                                                                : "-"}

                                                                        </p>

                                                                    </div>


                                                                    {/* STATUS + BUTTONS */}

                                                                    <div className="request-status-area">


                                                                        {/* STATUS */}

                                                                        <span
                                                                            className={`request-status ${getStatusClass(
                                                                                request.status
                                                                            )}`}
                                                                        >

                                                                            {request.status}

                                                                        </span>


                                                                        {/* REQUESTED */}

                                                                        {request.status ===
                                                                            "REQUESTED" && (

                                                                            <div className="request-actions">


                                                                                <button
                                                                                    className="accept-button"
                                                                                    onClick={() =>
                                                                                        handleAccept(
                                                                                            request.id
                                                                                        )
                                                                                    }
                                                                                >

                                                                                    ✓ Accept

                                                                                </button>


                                                                                <button
                                                                                    className="reject-button"
                                                                                    onClick={() =>
                                                                                        handleReject(
                                                                                            request.id
                                                                                        )
                                                                                    }
                                                                                >

                                                                                    ✕ Reject

                                                                                </button>

                                                                            </div>

                                                                        )}


                                                                        {/* ACCEPTED */}

                                                                        {request.status ===
                                                                            "ACCEPTED" && (

                                                                            <button
                                                                                className="complete-button"
                                                                                onClick={() =>
                                                                                    handleComplete(
                                                                                        request.id
                                                                                    )
                                                                                }
                                                                            >

                                                                                ✓ Mark Completed

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

                            })}

                        </div>

                    )}

                </div>

            </main>

            <Footer />

        </>
    );
}

export default MyDonations;
import React from "react";

function RequestCard({
    request,
    item,
    requester,
    onAccept,
    onReject,
    onComplete
}) {

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

        <div className="request-management-card">

            {/* ITEM IMAGE */}

            <div className="management-item-image">

                {item?.imageUrl ? (

                    <img
                        src={item.imageUrl}
                        alt={item.title || "Donation item"}
                    />

                ) : (

                    <span>
                        📦
                    </span>

                )}

            </div>


            {/* REQUEST DETAILS */}

            <div className="management-request-details">

                <span className="request-category">
                    {item?.category || "Donation"}
                </span>

                <h3>
                    {item?.title ||
                        `Item #${request.itemId}`}
                </h3>

                <p className="requester-name">
                    Requested by{" "}
                    <strong>
                        {requester?.name ||
                            `Student #${request.requesterId}`}
                    </strong>
                </p>

                <p className="request-message">
                    {request.message ||
                        "No message provided."}
                </p>

                <span className="request-date">
                    Requested on{" "}
                    {request.createdAt
                        ? new Date(
                            request.createdAt
                        ).toLocaleDateString()
                        : "Recently"}
                </span>

            </div>


            {/* STATUS AND ACTIONS */}

            <div className="management-request-actions">

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


                {/* REQUESTED */}

                {request.status === "REQUESTED" && (

                    <div className="request-action-buttons">

                        <button
                            className="accept-request-button"
                            onClick={() =>
                                onAccept(request.id)
                            }
                        >
                            Accept
                        </button>

                        <button
                            className="reject-request-button"
                            onClick={() =>
                                onReject(request.id)
                            }
                        >
                            Reject
                        </button>

                    </div>

                )}


                {/* ACCEPTED */}

                {request.status === "ACCEPTED" && (

                    <button
                        className="complete-request-button"
                        onClick={() =>
                            onComplete(request.id)
                        }
                    >
                        Mark Completed
                    </button>

                )}

            </div>

        </div>
    );
}

export default RequestCard;
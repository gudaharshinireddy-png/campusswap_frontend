import React from "react";

function DonationCard({
    item,
    onRequest,
    onDelete,
    showActions = true
}) {

    const isAvailable =
        item.status === "AVAILABLE";


    return (
        <div className="donation-card">

            <div className="donation-image">

                {item.imageUrl ? (

                    <img
                        src={item.imageUrl}
                        alt={item.title}
                    />

                ) : (

                    <div className="donation-image-placeholder">
                        📦
                    </div>

                )}


                <span className="donation-status">
                    {item.status || "AVAILABLE"}
                </span>

            </div>


            <div className="donation-content">

                <div className="donation-category">
                    {item.category || "Other"}
                </div>


                <h3>
                    {item.title}
                </h3>


                <p>
                    {item.description ||
                        "No description available."}
                </p>


                <div className="donation-details">

                    <span>
                        📍 {item.location || "Campus"}
                    </span>

                    <span>
                        ✦ {item.condition || "Good"}
                    </span>

                </div>


                {showActions && (

                    <div className="donation-actions">

                        {onRequest &&
                            isAvailable && (

                                <button
                                    className="primary-small-btn"
                                    onClick={() =>
                                        onRequest(item)
                                    }
                                >
                                    Request Item
                                </button>

                            )}


                        {onDelete && (

                            <button
                                className="delete-small-btn"
                                onClick={() =>
                                    onDelete(item.id)
                                }
                            >
                                Delete
                            </button>

                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default DonationCard;
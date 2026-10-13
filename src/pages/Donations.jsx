import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import DonationCard from "../components/DonationCard";
import { useAuth } from "../context/AuthContext";

function Donations() {

    const { user } = useAuth();

    const [items, setItems] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("ALL");

    const [message, setMessage] = useState("");

    const [selectedItem, setSelectedItem] = useState(null);

    const [requestMessage, setRequestMessage] = useState("");

    const [requesting, setRequesting] = useState(false);


    useEffect(() => {

        fetchDonations();

    }, []);


    const fetchDonations = async () => {

        try {

            setLoading(true);

            const response = await api.get("/items");

            setItems(response.data);

        } catch (error) {

            console.error(
                "Error loading donations:",
                error
            );

            setMessage(
                "Unable to load donations. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };


    const openRequestModal = (item) => {

        setSelectedItem(item);

        setRequestMessage("");

        setMessage("");

    };


    const closeRequestModal = () => {

        setSelectedItem(null);

        setRequestMessage("");

    };


    const handleRequest = async () => {

        if (!selectedItem) {
            return;
        }

        if (!user) {
            setMessage("Please login to request an item.");
            return;
        }

        if (
            selectedItem.ownerId === user.id
        ) {
            setMessage(
                "You cannot request your own donation."
            );

            return;
        }

        try {

            setRequesting(true);

            await api.post("/requests", {

                itemId: selectedItem.id,

                requesterId: user.id,

                ownerId: selectedItem.ownerId,

                message:
                    requestMessage.trim() ||
                    "I would like to receive this donated item."

            });


            closeRequestModal();

            setMessage(
                "Request sent successfully!"
            );

        } catch (error) {

            console.error(
                "Error requesting item:",
                error
            );

            setMessage(
                error.response?.data ||
                "Unable to send request."
            );

        } finally {

            setRequesting(false);

        }
    };


    const categories = [
        "ALL",
        "Books",
        "Electronics",
        "Clothing",
        "Stationery",
        "Furniture",
        "Others"
    ];


    const filteredItems = items.filter((item) => {

        const isAvailable =
            item.status === "AVAILABLE";

        const matchesSearch =
            item.title
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            item.description
                ?.toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            category === "ALL" ||
            item.category === category;

        return (
            isAvailable &&
            matchesSearch &&
            matchesCategory
        );

    });


    return (

        <div className="donations-page">

            <div className="donations-container">

                {/* HEADER */}

                <section className="donations-header">

                    <div>

                        <span className="page-label">
                            CAMPUS DONATIONS
                        </span>

                        <h1>
                            Find something
                            <span> useful.</span>
                        </h1>

                        <p>
                            Browse items donated by students
                            and request something you need.
                        </p>

                    </div>

                    <Link
                        to="/add-donation"
                        className="donations-add-button"
                    >
                        + Donate an Item
                    </Link>

                </section>


                {/* MESSAGE */}

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


                {/* SEARCH */}

                <section className="donation-filters">

                    <div className="donation-search">

                        <span>
                            🔎
                        </span>

                        <input
                            type="text"
                            placeholder="Search donated items..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>


                    <div className="category-filters">

                        {categories.map(
                            (itemCategory) => (

                                <button
                                    key={itemCategory}
                                    className={
                                        category === itemCategory
                                            ? "category-button active"
                                            : "category-button"
                                    }
                                    onClick={() =>
                                        setCategory(
                                            itemCategory
                                        )
                                    }
                                >
                                    {itemCategory}
                                </button>

                            )
                        )}

                    </div>

                </section>


                {/* RESULTS */}

                <section className="donations-results">

                    <div className="results-heading">

                        <div>

                            <span>
                                AVAILABLE ITEMS
                            </span>

                            <h2>
                                {filteredItems.length}{" "}
                                {filteredItems.length === 1
                                    ? "item"
                                    : "items"}{" "}
                                available
                            </h2>

                        </div>

                    </div>


                    {loading ? (

                        <div className="donations-loading">

                            <div className="loading-spinner"></div>

                            <p>
                                Loading donations...
                            </p>

                        </div>

                    ) : filteredItems.length === 0 ? (

                        <div className="empty-donations">

                            <div className="empty-icon">
                                📦
                            </div>

                            <h3>
                                No donations found
                            </h3>

                            <p>
                                Try another search or category,
                                or check back later for new
                                donated items.
                            </p>

                            <button
                                onClick={() => {
                                    setSearch("");
                                    setCategory("ALL");
                                }}
                                className="clear-filter-button"
                            >
                                Clear Filters
                            </button>

                        </div>

                    ) : (

                        <div className="donations-grid">

                            {filteredItems.map(
                                (item) => (

                                    <DonationCard
                                        key={item.id}
                                        item={item}
                                        onRequest={
                                            openRequestModal
                                        }
                                    />

                                )
                            )}

                        </div>

                    )}

                </section>

            </div>


            {/* REQUEST MODAL */}

            {selectedItem && (

                <div
                    className="request-modal-overlay"
                    onClick={closeRequestModal}
                >

                    <div
                        className="request-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="modal-close"
                            onClick={closeRequestModal}
                        >
                            ×
                        </button>


                        <div className="modal-icon">
                            🙋
                        </div>


                        <span className="modal-label">
                            REQUEST DONATION
                        </span>


                        <h2>
                            Request this item?
                        </h2>


                        <p className="modal-item-name">
                            {selectedItem.title}
                        </p>


                        <p className="modal-description">
                            Send a request to the student
                            who donated this item.
                        </p>


                        <label>
                            Message
                        </label>

                        <textarea
                            value={requestMessage}
                            onChange={(e) =>
                                setRequestMessage(
                                    e.target.value
                                )
                            }
                            placeholder="Write a short message to the donor..."
                            rows="4"
                        />


                        <div className="modal-actions">

                            <button
                                className="modal-cancel"
                                onClick={closeRequestModal}
                            >
                                Cancel
                            </button>

                            <button
                                className="modal-confirm"
                                onClick={handleRequest}
                                disabled={requesting}
                            >
                                {requesting
                                    ? "Sending..."
                                    : "Send Request"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}

export default Donations;
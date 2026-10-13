import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function AddDonation() {

    const { user } = useAuth();

    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        title: "",

        description: "",

        category: "",

        condition: "Good",

        location: "",

        imageUrl: ""

    });


    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setSuccess("");


        if (!user) {

            setError(
                "Please login before donating an item."
            );

            return;
        }


        if (!formData.title.trim()) {

            setError(
                "Please enter the item name."
            );

            return;
        }


        if (!formData.description.trim()) {

            setError(
                "Please enter a description."
            );

            return;
        }


        if (!formData.category) {

            setError(
                "Please select a category."
            );

            return;
        }


        if (!formData.location.trim()) {

            setError(
                "Please enter the pickup location."
            );

            return;
        }


        try {

            setLoading(true);


            await api.post("/items", {

                title:
                    formData.title.trim(),

                description:
                    formData.description.trim(),

                category:
                    formData.category,

                itemType:
                    "DONATION",

                condition:
                    formData.condition,

                location:
                    formData.location.trim(),

                ownerId:
                    user.id,

                status:
                    "AVAILABLE",

                imageUrl:
                    formData.imageUrl.trim() ||
                    null

            });


            setSuccess(
                "Your donation has been added successfully!"
            );


            setTimeout(() => {

                navigate("/my-donations");

            }, 1200);


        } catch (error) {

            console.error(
                "Error adding donation:",
                error
            );


            setError(
                error.response?.data ||
                "Unable to add donation. Please try again."
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="add-donation-page">

            <div className="add-donation-container">


                {/* BACK */}

                <Link
                    to="/donations"
                    className="back-link"
                >
                    ← Back to Donations
                </Link>


                {/* HEADER */}

                <div className="add-donation-header">

                    <span className="page-label">
                        GIVE SOMETHING BACK
                    </span>

                    <h1>
                        Donate an
                        <span> item.</span>
                    </h1>

                    <p>
                        List something you no longer need
                        and make it available to another
                        student.
                    </p>

                </div>


                {/* FORM */}

                <div className="donation-form-wrapper">


                    {/* FORM SIDE */}

                    <form
                        className="donation-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-section-title">

                            <span>
                                ITEM INFORMATION
                            </span>

                            <h2>
                                Tell us about your item
                            </h2>

                        </div>


                        {/* ERROR */}

                        {error && (

                            <div className="form-error">
                                ⚠ {error}
                            </div>

                        )}


                        {/* SUCCESS */}

                        {success && (

                            <div className="form-success">
                                ✓ {success}
                            </div>

                        )}


                        {/* TITLE */}

                        <div className="form-field">

                            <label>
                                Item Name
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Engineering Mathematics Book"
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="form-field">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={
                                    formData.description
                                }
                                onChange={handleChange}
                                placeholder="Describe the item and its condition..."
                                rows="5"
                            />

                        </div>


                        {/* CATEGORY + CONDITION */}

                        <div className="form-row">


                            <div className="form-field">

                                <label>
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={
                                        formData.category
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="">
                                        Select category
                                    </option>

                                    <option value="Books">
                                        Books
                                    </option>

                                    <option value="Electronics">
                                        Electronics
                                    </option>

                                    <option value="Clothing">
                                        Clothing
                                    </option>

                                    <option value="Stationery">
                                        Stationery
                                    </option>

                                    <option value="Furniture">
                                        Furniture
                                    </option>

                                    <option value="Others">
                                        Others
                                    </option>

                                </select>

                            </div>


                            <div className="form-field">

                                <label>
                                    Condition
                                </label>

                                <select
                                    name="condition"
                                    value={
                                        formData.condition
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="New">
                                        New
                                    </option>

                                    <option value="Like New">
                                        Like New
                                    </option>

                                    <option value="Good">
                                        Good
                                    </option>

                                    <option value="Fair">
                                        Fair
                                    </option>

                                    <option value="Used">
                                        Used
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* LOCATION */}

                        <div className="form-field">

                            <label>
                                Pickup Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={
                                    formData.location
                                }
                                onChange={handleChange}
                                placeholder="e.g. College Hostel, Block A"
                            />

                        </div>


                        {/* IMAGE */}

                        <div className="form-field">

                            <label>
                                Image URL
                                <span>
                                    {" "} (optional)
                                </span>
                            </label>

                            <input
                                type="text"
                                name="imageUrl"
                                value={
                                    formData.imageUrl
                                }
                                onChange={handleChange}
                                placeholder="Paste an image URL"
                            />

                        </div>


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="submit-donation-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Adding Donation..."
                                : "Donate This Item"}

                        </button>


                        <p className="form-note">

                            By listing this item, you are
                            offering it as a free donation
                            to another student.

                        </p>

                    </form>


                    {/* PREVIEW */}

                    <div className="donation-preview">

                        <div className="preview-label">
                            PREVIEW
                        </div>

                        <div className="preview-card">

                            <div className="preview-image">

                                {formData.imageUrl ? (

                                    <img
                                        src={
                                            formData.imageUrl
                                        }
                                        alt="Preview"
                                    />

                                ) : (

                                    <span>
                                        📦
                                    </span>

                                )}

                            </div>


                            <div className="preview-content">

                                <span>
                                    {formData.category ||
                                        "CATEGORY"}
                                </span>

                                <h3>
                                    {formData.title ||
                                        "Your item name"}
                                </h3>

                                <p>
                                    {formData.description ||
                                        "Your item description will appear here."}
                                </p>


                                <div className="preview-meta">

                                    <span>
                                        📍{" "}
                                        {formData.location ||
                                            "Pickup location"}
                                    </span>

                                    <span>
                                        ✦{" "}
                                        {formData.condition}
                                    </span>

                                </div>

                            </div>

                        </div>


                        <div className="preview-tip">

                            <span>
                                💡
                            </span>

                            <div>

                                <strong>
                                    Make your donation useful
                                </strong>

                                <p>
                                    Add a clear description
                                    and accurate condition
                                    so students know what
                                    they are requesting.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default AddDonation;
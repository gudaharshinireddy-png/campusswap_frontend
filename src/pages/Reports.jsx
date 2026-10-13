import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Reports() {

    const { user } = useAuth();

    const isAdmin =
        user?.role === "ADMIN";


    const [reports, setReports] =
        useState([]);

    const [items, setItems] =
        useState({});

    const [loading, setLoading] =
        useState(true);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");


    const [showForm, setShowForm] =
        useState(false);

    const [selectedItem, setSelectedItem] =
        useState(null);


    const [formData, setFormData] =
        useState({

            itemId: "",

            reason: "",

            description: ""

        });


    useEffect(() => {

        if (isAdmin) {

            fetchReports();

        } else {

            setLoading(false);

        }

    }, [isAdmin]);


    const fetchReports = async () => {

        try {

            setLoading(true);

            const response =
                await api.get("/reports");

            setReports(response.data);


            const itemDetails = {};


            for (
                const report
                of response.data
            ) {

                try {

                    const itemResponse =
                        await api.get(
                            `/items/${report.itemId}`
                        );

                    itemDetails[
                        report.itemId
                    ] = itemResponse.data;

                } catch (itemError) {

                    console.error(
                        "Unable to load report item:",
                        itemError
                    );
                }
            }


            setItems(itemDetails);

        } catch (error) {

            console.error(
                "Error loading reports:",
                error
            );

            setError(
                "Unable to load reports."
            );

        } finally {

            setLoading(false);
        }
    };


    const openReportForm = (
        item = null
    ) => {

        setSelectedItem(item);

        setFormData({

            itemId:
                item?.id || "",

            reason: "",

            description: ""

        });

        setShowForm(true);

        setError("");

        setMessage("");
    };


    const closeReportForm = () => {

        setShowForm(false);

        setSelectedItem(null);

        setFormData({

            itemId: "",

            reason: "",

            description: ""

        });
    };


    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData(
            (previous) => ({

                ...previous,

                [name]: value

            })
        );
    };


    const handleSubmitReport =
        async (e) => {

            e.preventDefault();

            setError("");

            setMessage("");


            if (!formData.itemId) {

                setError(
                    "Please enter an item ID."
                );

                return;
            }


            if (!formData.reason) {

                setError(
                    "Please select a reason."
                );

                return;
            }


            try {

                await api.post(
                    "/reports",
                    {

                        itemId:
                            Number(
                                formData.itemId
                            ),

                        reportedBy:
                            user.id,

                        reason:
                            formData.reason,

                        description:
                            formData.description.trim()

                    }
                );


                closeReportForm();

                setMessage(
                    "Report submitted successfully."
                );

            } catch (error) {

                console.error(
                    "Error submitting report:",
                    error
                );

                setError(
                    error.response?.data ||
                    "Unable to submit report."
                );
            }
        };


    const handleDeleteReport =
        async (reportId) => {

            const confirmed =
                window.confirm(
                    "Are you sure you want to delete this report?"
                );

            if (!confirmed) {
                return;
            }


            try {

                await api.delete(
                    `/reports/${reportId}`
                );

                setReports(
                    (previous) =>
                        previous.filter(
                            (report) =>
                                report.id !==
                                reportId
                        )
                );


                setMessage(
                    "Report deleted successfully."
                );

            } catch (error) {

                console.error(
                    "Error deleting report:",
                    error
                );

                setError(
                    error.response?.data ||
                    "Unable to delete report."
                );
            }
        };


    const updateReportStatus =
        async (
            reportId,
            status
        ) => {

            try {

                await api.put(
                    `/reports/${reportId}`,
                    {
                        status: status
                    }
                );


                setReports(
                    (previous) =>
                        previous.map(
                            (report) =>
                                report.id ===
                                reportId
                                    ? {
                                        ...report,
                                        status
                                    }
                                    : report
                        )
                );


                setMessage(
                    `Report marked as ${status.toLowerCase()}.`
                );

            } catch (error) {

                console.error(
                    "Error updating report:",
                    error
                );

                setError(
                    error.response?.data ||
                    "Unable to update report."
                );
            }
        };


    return (

        <div className="reports-page">

            <div className="reports-container">


                {/* HEADER */}

                <section className="reports-header">

                    <div>

                        <span className="page-label">
                            {isAdmin
                                ? "REPORT MANAGEMENT"
                                : "COMMUNITY SAFETY"}
                        </span>

                        <h1>

                            {isAdmin
                                ? "Manage"
                                : "Report an"}{" "}

                            <span>
                                {isAdmin
                                    ? "reports."
                                    : "item."}
                            </span>

                        </h1>

                        <p>

                            {isAdmin
                                ? "Review and manage reports submitted by students."
                                : "Help keep CampusSwap safe by reporting inappropriate donation listings."}

                        </p>

                    </div>


                    {!isAdmin && (

                        <button
                            className="donations-add-button"
                            onClick={() =>
                                openReportForm()
                            }
                        >
                            + Report an Item
                        </button>

                    )}

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


                {/* ADMIN REPORTS */}

                {isAdmin && (

                    <section className="reports-section">

                        <div className="reports-section-heading">

                            <span>
                                SUBMITTED REPORTS
                            </span>

                            <h2>
                                Review reports
                            </h2>

                        </div>


                        {loading ? (

                            <div className="donations-loading">

                                <div className="loading-spinner"></div>

                                <p>
                                    Loading reports...
                                </p>

                            </div>

                        ) : reports.length === 0 ? (

                            <div className="reports-empty">

                                <div className="empty-icon">
                                    🛡️
                                </div>

                                <h3>
                                    No reports
                                </h3>

                                <p>
                                    There are currently
                                    no reports to review.
                                </p>

                            </div>

                        ) : (

                            <div className="reports-list">

                                {reports.map(
                                    (report) => {

                                        const item =
                                            items[
                                                report.itemId
                                            ];


                                        return (

                                            <div
                                                key={report.id}
                                                className="report-card"
                                            >

                                                <div className="report-card-top">

                                                    <div>

                                                        <span className="report-label">
                                                            REPORT #{report.id}
                                                        </span>

                                                        <h3>
                                                            {item?.title ||
                                                                `Item #${report.itemId}`}
                                                        </h3>

                                                    </div>


                                                    <span
                                                        className={
                                                            `report-status ${String(
                                                                report.status ||
                                                                "PENDING"
                                                            ).toLowerCase()}`
                                                        }
                                                    >
                                                        {report.status}
                                                    </span>

                                                </div>


                                                <div className="report-content">

                                                    <p>
                                                        <strong>
                                                            Reason:
                                                        </strong>{" "}
                                                        {report.reason}
                                                    </p>

                                                    <p>
                                                        <strong>
                                                            Description:
                                                        </strong>{" "}
                                                        {report.description ||
                                                            "No description provided."}
                                                    </p>

                                                    <p>
                                                        <strong>
                                                            Reported by:
                                                        </strong>{" "}
                                                        Student #
                                                        {report.reportedBy}
                                                    </p>

                                                </div>


                                                <div className="report-actions">

                                                    {report.status ===
                                                        "PENDING" && (

                                                        <button
                                                            className="accept-request-button"
                                                            onClick={() =>
                                                                updateReportStatus(
                                                                    report.id,
                                                                    "RESOLVED"
                                                                )
                                                            }
                                                        >
                                                            Resolve
                                                        </button>

                                                    )}


                                                    <button
                                                        className="delete-small-btn"
                                                        onClick={() =>
                                                            handleDeleteReport(
                                                                report.id
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

                )}


                {/* STUDENT */}

                {!isAdmin && (

                    <section className="student-report-info">

                        <div className="report-info-card">

                            <div className="report-info-icon">
                                🛡️
                            </div>

                            <h2>
                                Help keep CampusSwap safe
                            </h2>

                            <p>
                                If you find a donation
                                listing that contains
                                incorrect, inappropriate,
                                or misleading information,
                                you can report it to the
                                administrator.
                            </p>

                            <button
                                className="primary-small-btn"
                                onClick={() =>
                                    openReportForm()
                                }
                            >
                                Report an Item
                            </button>

                        </div>

                    </section>

                )}

            </div>


            {/* REPORT MODAL */}

            {showForm && (

                <div
                    className="request-modal-overlay"
                    onClick={closeReportForm}
                >

                    <div
                        className="request-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="modal-close"
                            onClick={closeReportForm}
                        >
                            ×
                        </button>


                        <div className="modal-icon">
                            🛡️
                        </div>


                        <span className="modal-label">
                            REPORT ITEM
                        </span>


                        <h2>
                            Report a donation
                        </h2>


                        <form
                            onSubmit={
                                handleSubmitReport
                            }
                        >

                            <div className="form-field">

                                <label>
                                    Item ID
                                </label>

                                <input
                                    type="number"
                                    name="itemId"
                                    value={
                                        formData.itemId
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter donation item ID"
                                    disabled={
                                        !!selectedItem
                                    }
                                />

                            </div>


                            <div className="form-field">

                                <label>
                                    Reason
                                </label>

                                <select
                                    name="reason"
                                    value={
                                        formData.reason
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="">
                                        Select a reason
                                    </option>

                                    <option value="Incorrect item information">
                                        Incorrect item information
                                    </option>

                                    <option value="Inappropriate content">
                                        Inappropriate content
                                    </option>

                                    <option value="Misleading description">
                                        Misleading description
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            <div className="form-field">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Explain the issue..."
                                    rows="4"
                                />

                            </div>


                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="modal-cancel"
                                    onClick={
                                        closeReportForm
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="modal-confirm"
                                >
                                    Submit Report
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Reports;
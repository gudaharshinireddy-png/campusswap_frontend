import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Profile() {

    const {
        user,
        login
    } = useAuth();


    const [formData, setFormData] =
        useState({

            name: "",

            email: "",

            phone: "",

            department: "",

            year: "",

            role: ""

        });


    const [passwordData, setPasswordData] =
        useState({

            oldPassword: "",

            newPassword: ""

        });


    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [passwordLoading, setPasswordLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");


    useEffect(() => {

        if (user?.id) {
            fetchProfile();
        }

    }, [user]);


    const fetchProfile = async () => {

        try {

            setLoading(true);

            const response =
                await api.get(
                    `/users/${user.id}`
                );


            const profile =
                response.data;


            setFormData({

                name:
                    profile.name || "",

                email:
                    profile.email || "",

                phone:
                    profile.phone || "",

                department:
                    profile.department || "",

                year:
                    profile.year || "",

                role:
                    profile.role || ""

            });

        } catch (error) {

            console.error(
                "Error loading profile:",
                error
            );

            setError(
                "Unable to load profile."
            );

        } finally {

            setLoading(false);
        }
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


    const handlePasswordChange =
        (e) => {

            const {
                name,
                value
            } = e.target;

            setPasswordData(
                (previous) => ({

                    ...previous,

                    [name]: value

                })
            );
        };


    const handleSaveProfile =
        async (e) => {

            e.preventDefault();

            setError("");

            setMessage("");


            if (!formData.name.trim()) {

                setError(
                    "Name cannot be empty."
                );

                return;
            }


            if (!formData.phone.trim()) {

                setError(
                    "Phone number cannot be empty."
                );

                return;
            }


            try {

                setSaving(true);


                const response =
                    await api.put(
                        `/users/${user.id}`,
                        {

                            name:
                                formData.name.trim(),

                            email:
                                formData.email,

                            phone:
                                formData.phone.trim(),

                            department:
                                formData.department,

                            year:
                                formData.year,

                            role:
                                formData.role

                        }
                    );


                login(response.data);


                setMessage(
                    "Profile updated successfully."
                );

            } catch (error) {

                console.error(
                    "Error updating profile:",
                    error
                );

                setError(
                    error.response?.data ||
                    "Unable to update profile."
                );

            } finally {

                setSaving(false);
            }
        };


    const handlePasswordUpdate =
        async (e) => {

            e.preventDefault();

            setError("");

            setMessage("");


            if (
                !passwordData.oldPassword ||
                !passwordData.newPassword
            ) {

                setError(
                    "Please enter both passwords."
                );

                return;
            }


            if (
                passwordData.newPassword.length < 6
            ) {

                setError(
                    "New password must contain at least 6 characters."
                );

                return;
            }


            try {

                setPasswordLoading(true);


                await api.put(
                    `/users/${user.id}/password`,
                    passwordData
                );


                setPasswordData({

                    oldPassword: "",

                    newPassword: ""

                });


                setMessage(
                    "Password updated successfully."
                );

            } catch (error) {

                console.error(
                    "Error updating password:",
                    error
                );

                setError(
                    error.response?.data ||
                    "Unable to update password."
                );

            } finally {

                setPasswordLoading(false);
            }
        };


    if (loading) {

        return (

            <div className="profile-page">

                <div className="profile-loading">

                    <div className="loading-spinner"></div>

                    <p>
                        Loading profile...
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="profile-page">

            <div className="profile-container">


                {/* HEADER */}

                <section className="profile-header">

                    <div className="profile-avatar-large">

                        {formData.name
                            ? formData.name
                                .charAt(0)
                                .toUpperCase()
                            : "U"}

                    </div>


                    <div>

                        <span className="page-label">
                            MY ACCOUNT
                        </span>

                        <h1>
                            Your
                            <span> profile.</span>
                        </h1>

                        <p>
                            Manage your CampusSwap
                            account information.
                        </p>

                    </div>

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


                {/* PROFILE */}

                <div className="profile-grid">


                    <form
                        className="profile-card"
                        onSubmit={
                            handleSaveProfile
                        }
                    >

                        <div className="profile-card-heading">

                            <span>
                                ACCOUNT INFORMATION
                            </span>

                            <h2>
                                Personal details
                            </h2>

                        </div>


                        <div className="form-field">

                            <label>
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={
                                    formData.name
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                value={
                                    formData.email
                                }
                                disabled
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={
                                    formData.phone
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        {formData.role ===
                            "STUDENT" && (

                            <>

                                <div className="form-field">

                                    <label>
                                        Department
                                    </label>

                                    <input
                                        type="text"
                                        name="department"
                                        value={
                                            formData.department
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="form-field">

                                    <label>
                                        Year
                                    </label>

                                    <input
                                        type="text"
                                        name="year"
                                        value={
                                            formData.year
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                            </>

                        )}


                        <div className="profile-role">

                            <span>
                                ACCOUNT ROLE
                            </span>

                            <strong>
                                {formData.role}
                            </strong>

                        </div>


                        <button
                            type="submit"
                            className="submit-donation-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </form>


                    {/* PASSWORD */}

                    <form
                        className="profile-card"
                        onSubmit={
                            handlePasswordUpdate
                        }
                    >

                        <div className="profile-card-heading">

                            <span>
                                SECURITY
                            </span>

                            <h2>
                                Change password
                            </h2>

                        </div>


                        <div className="password-info">

                            <span>
                                🔒
                            </span>

                            <p>
                                Keep your CampusSwap
                                account secure by
                                updating your password
                                regularly.
                            </p>

                        </div>


                        <div className="form-field">

                            <label>
                                Current Password
                            </label>

                            <input
                                type="password"
                                name="oldPassword"
                                value={
                                    passwordData.oldPassword
                                }
                                onChange={
                                    handlePasswordChange
                                }
                                placeholder="Enter current password"
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                New Password
                            </label>

                            <input
                                type="password"
                                name="newPassword"
                                value={
                                    passwordData.newPassword
                                }
                                onChange={
                                    handlePasswordChange
                                }
                                placeholder="Enter new password"
                            />

                        </div>


                        <button
                            type="submit"
                            className="submit-donation-button"
                            disabled={
                                passwordLoading
                            }
                        >
                            {passwordLoading
                                ? "Updating..."
                                : "Update Password"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Profile;
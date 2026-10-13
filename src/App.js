import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Donations from "./pages/Donations";
import AddDonation from "./pages/AddDonation";
import MyDonations from "./pages/MyDonations";
import MyRequests from "./pages/MyRequests";

import Requests from "./pages/Requests";
import AdminRequests from "./pages/AdminRequests";

import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Users from "./pages/Users";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    return (

        <AuthProvider>

            <BrowserRouter>

                <Routes>


                    {/* =================================================
                        PUBLIC PAGES
                        ================================================= */}

                    <Route
                        path="/"
                        element={
                            <Home />
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <Login />
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <Register />
                        }
                    />


                    {/* =================================================
                        DASHBOARD
                        STUDENT + ADMIN
                        ================================================= */}

                    <Route
                        path="/dashboard"
                        element={

                            <ProtectedRoute>

                                <Dashboard />

                            </ProtectedRoute>

                        }
                    />


                    {/* =================================================
                        STUDENT PAGES
                        ================================================= */}

                    <Route
                        path="/donations"
                        element={

                            <ProtectedRoute
                                allowedRoles={[
                                    "STUDENT"
                                ]}
                            >

                                <Donations />

                            </ProtectedRoute>

                        }
                    />


                    <Route
                        path="/add-donation"
                        element={

                            <ProtectedRoute
                                allowedRoles={[
                                    "STUDENT"
                                ]}
                            >

                                <AddDonation />

                            </ProtectedRoute>

                        }
                    />


                    <Route
                        path="/my-donations"
                        element={

                            <ProtectedRoute
                                allowedRoles={[
                                    "STUDENT"
                                ]}
                            >

                                <MyDonations />

                            </ProtectedRoute>

                        }
                    />


                    <Route
                        path="/my-requests"
                        element={

                            <ProtectedRoute
                                allowedRoles={[
                                    "STUDENT"
                                ]}
                            >

                                <MyRequests />

                            </ProtectedRoute>

                        }
                    />


                    {/* =================================================
                        STUDENT DONATION REQUEST MANAGEMENT
                        ================================================= */}

                    <Route
                        path="/requests"
                        element={

                            <ProtectedRoute
                                allowedRoles={[
                                    "STUDENT"
                                ]}
                            >

                                <Requests />

                            </ProtectedRoute>

                        }
                    />


                    {/* =================================================
                        ADMIN USER MANAGEMENT
                        ================================================= */}

                    <Route
                        path="/users"
                        element={

                            <ProtectedRoute
                                allowedRoles={[
                                    "ADMIN"
                                ]}
                            >

                                <Users />

                            </ProtectedRoute>

                        }
                    />


                    {/* =================================================
                        ADMIN REQUEST MANAGEMENT
                        ================================================= */}

                    <Route
                        path="/admin/requests"
                        element={

                            <ProtectedRoute
                                allowedRoles={[
                                    "ADMIN"
                                ]}
                            >

                                <AdminRequests />

                            </ProtectedRoute>

                        }
                    />


                    {/* =================================================
                        REPORTS
                        STUDENT + ADMIN
                        ================================================= */}

                    <Route
                        path="/reports"
                        element={

                            <ProtectedRoute
                                allowedRoles={[
                                    "ADMIN",
                                    "STUDENT"
                                ]}
                            >

                                <Reports />

                            </ProtectedRoute>

                        }
                    />


                    {/* =================================================
                        PROFILE
                        STUDENT + ADMIN
                        ================================================= */}

                    <Route
                        path="/profile"
                        element={

                            <ProtectedRoute>

                                <Profile />

                            </ProtectedRoute>

                        }
                    />


                    {/* =================================================
                        UNKNOWN URL
                        ================================================= */}

                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/"
                                replace
                            />
                        }
                    />

                </Routes>

            </BrowserRouter>

        </AuthProvider>
    );
}


export default App;
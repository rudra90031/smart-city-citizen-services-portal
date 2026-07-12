import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminSettings.css";

import {
    getAdminProfile,
    updateAdminProfile,
    changeAdminPassword,
} from "../services/authService";

function AdminSettings() {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const data = await getAdminProfile();
            console.log("PROFILE API RESPONSE:", data);

            setProfile({
                name: data.name,
                email: data.email,
                phone: data.phone,
            });

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleProfileChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value,

        });

    };

    const saveProfile = async () => {

        try {

            await updateAdminProfile(profile);

            alert("Profile Updated Successfully");

        }

        catch (err) {

            alert("Update Failed");

        }

    };
    const handlePasswordChange = (e) => {

        setPasswordData({

            ...passwordData,

            [e.target.name]: e.target.value,

        });

    };
    const updatePassword = async () => {

        if (passwordData.newPassword !== passwordData.confirmPassword) {

            return alert("Passwords do not match");

        }

        try {

            await changeAdminPassword({

                currentPassword: passwordData.currentPassword,

                newPassword: passwordData.newPassword,

            });

            alert("Password Updated");

            setPasswordData({

                currentPassword: "",

                newPassword: "",

                confirmPassword: "",

            });

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Password Update Failed"

            );

        }

    };

    return (

        <>
            <AdminSidebar />

            <div className="admin-settings-page">

                <div className="settings-header">

                    <h1>Admin Settings</h1>

                    <p>
                        Manage administrator account and security
                    </p>

                </div>

                <div className="settings-grid">

                    {/* PROFILE */}

                    <div className="settings-card">

                        <h2>Profile</h2>

                        <div className="profile-body">

                            <div className="profile-avatar">
                                A
                            </div>

                            <div className="profile-fields">

                                <div className="field">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleProfileChange}
                                    />
                                </div>

                                <div className="field">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleProfileChange}
                                    />
                                </div>

                                <div className="field">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleProfileChange}
                                    />
                                </div>

                                <button
                                    className="primary-btn"
                                    onClick={saveProfile}
                                >
                                    Save Changes
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* SECURITY */}

                    <div className="settings-card security-card">

                        <h2>Security</h2>

                        <div className="field">

                            <label>Current Password</label>

                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                            />

                        </div>

                        <div className="field">

                            <label>New Password</label>

                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                            />

                        </div>

                        <div className="field">

                            <label>Confirm Password</label>

                            <input
                                type="password"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                            />

                        </div>

                        <button
                            className="primary-btn update-btn"
                            onClick={updatePassword}
                        >
                            Update Password
                        </button>

                    </div>
                    {/* ACCOUNT */}

                    <div className="settings-card account-card">

                        <h2>Account</h2>

                        <div className="info-row">
                            <span>Role</span>
                            <strong>Administrator</strong>
                        </div>

                        <div className="info-row">
                            <span>Portal</span>
                            <strong>Smart City Citizen Portal</strong>
                        </div>

                        <div className="info-row">
                            <span>Account Status</span>
                            <strong className="active-status">Active</strong>
                        </div>

                        <div className="info-row">
                            <span>Last Login</span>
                            <strong>Today</strong>
                        </div>

                    </div>

                    {/* SESSION */}

                    <div className="settings-card session-card">

                        <h2>Session</h2>

                        <p className="session-text">

                            Logout from all active devices except this one.

                        </p>

                        <button className="secondary-btn">

                            Logout Other Devices

                        </button>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AdminSettings;
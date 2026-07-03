import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminSettings.css";

function AdminSettings() {

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
                                    <input type="text" />
                                </div>

                                <div className="field">
                                    <label>Email</label>
                                    <input type="email" />
                                </div>

                                <div className="field">
                                    <label>Phone</label>
                                    <input type="text" />
                                </div>

                                <button className="primary-btn">
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
                                placeholder="Current Password"
                            />

                        </div>

                        <div className="field">

                            <label>New Password</label>

                            <input
                                type="password"
                                placeholder="New Password"
                            />

                        </div>

                        <div className="field">

                            <label>Confirm Password</label>

                            <input
                                type="password"
                                placeholder="Confirm Password"
                            />

                        </div>

                        <button className="primary-btn">
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
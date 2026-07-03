import { NavLink } from "react-router-dom";

import {
    FiGrid,
    FiFileText,
    FiMap,
    FiBell,
    FiSettings,
    FiLogOut,
    FiCreditCard
} from "react-icons/fi";

import "../assets/styles/adminSidebar.css";

function AdminSidebar() {
    return (
        <div className="admin-sidebar">

            <div className="sidebar-logo">

                <h2>SMART CITY</h2>
                <p>ADMIN PORTAL</p>

            </div>

            <div className="sidebar-links">

                <NavLink
                    to="/admin/dashboard"
                    className="sidebar-link"
                >
                    <FiGrid />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/complaints"
                    className="sidebar-link"
                >
                    <FiFileText />
                    Complaints
                </NavLink>

                <NavLink
                    to="/admin/certificates"
                    className="sidebar-link"
                >
                    <FiFileText />
                    Certificates
                </NavLink>

                <NavLink
                    to="/admin/bills"
                    className="sidebar-link"
                >
                    <FiCreditCard />
                    Utility Bills
                </NavLink>

                <NavLink
                    to="/admin/gis"
                    className="sidebar-link"
                >
                    <FiMap />
                    GIS Map
                </NavLink>

                <NavLink
                    to="/admin/notifications"
                    className="sidebar-link"
                >
                    <FiBell />
                    Notifications
                </NavLink>

                <NavLink
                    to="/admin/settings"
                    className="sidebar-link"
                >
                    <FiSettings />
                    Settings
                </NavLink>

            </div>

            <div className="sidebar-footer">

                <button className="logout-btn">
                    <FiLogOut />
                    Logout
                </button>

                <div className="admin-profile">

                    <div className="profile-circle">
                    R
                    </div>

                    <div>
                        <h4>Rudra Pratap Singh</h4>
                        <p>admin@smartcity.gov.in</p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminSidebar;
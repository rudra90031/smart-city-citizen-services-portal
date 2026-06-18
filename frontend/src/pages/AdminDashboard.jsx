import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminDashboard.css";
import { Doughnut } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function AdminDashboard() {
    return (

        <div>

            <AdminSidebar />

            <div className="admin-dashboard">

                <div className="dashboard-top">

                    <div>

                        <h1>Dashboard</h1>

                        <p>
                            Welcome back, Admin 
                        </p>

                    </div>

                    <div className="dashboard-actions">

                        <input
                            type="text"
                            placeholder="Search here..."
                        />

                        <button className="notification-btn">
                            🔔
                        </button>

                    </div>

                </div>

                {/* Stats Cards */}

                <div className="stats-grid">

                    <div className="stat-card green">

                        <h4>Total Complaints</h4>

                        <h2>1,248</h2>

                        <p>↑ 15.2% from last month</p>

                        <div className="progress-line">
                            <span></span>
                        </div>

                    </div>

                    <div className="stat-card purple">

                        <h4>Pending Complaints</h4>

                        <h2>320</h2>

                        <p>↑ 8.4% from last month</p>

                        <div className="progress-line">
                            <span></span>
                        </div>

                    </div>

                    <div className="stat-card green">

                        <h4>Resolved Complaints</h4>

                        <h2>928</h2>

                        <p>↑ 18.7% from last month</p>

                        <div className="progress-line">
                            <span></span>
                        </div>

                    </div>

                    <div className="stat-card purple">

                        <h4>Pending Certificates</h4>

                        <h2>156</h2>

                        <p>↑ 12.3% from last month</p>

                        <div className="progress-line">
                            <span></span>
                        </div>

                    </div>

                </div>

                <div className="middle-row">

                    <div className="revenue-card">

                        <div className="revenue-header">
                            <h3>Revenue (This Month)</h3>

                            <div className="revenue-nav">
                                <button>←</button>
                                <button>→</button>
                            </div>
                        </div>

                        <div className="revenue-body">

                            <div className="revenue-left">
                                <h2>14%</h2>
                                <p>Avg score: ₹21,48,950</p>
                            </div>

                            <div className="revenue-center">



                                <h1 className="revenue-amount">
                                    ₹24,58,320
                                </h1>

                            </div>

                        </div>

                    </div>

                    <div className="chart-card">

                        <h3>Complaint Category Distribution</h3>

                        <div className="chart-wrapper">
                            <Doughnut
                                data={{
                                    labels: [
                                        "Electricity",
                                        "Water",
                                        "Road",
                                        "Garbage",
                                        "Others"
                                    ],
                                    datasets: [
                                        {
                                            data: [437, 312, 250, 150, 99],
                                            backgroundColor: [
                                                "#5D3FD3",
                                                "#7A5BEF",
                                                "#9B85F3",
                                                "#B6A7F5",
                                                "#273469"
                                            ],
                                            borderWidth: 0
                                        }
                                    ]
                                }}
                                options={{
                                    plugins: {
                                        legend: {
                                            position: "right"
                                        }
                                    },
                                    cutout: "65%"
                                }}
                            />
                        </div>

                    </div>

                </div>
                <div className="system-status">

                    <h3>System Status</h3>

                    <div className="status-grid">

                        <div className="status-item">
                            <div className="status-icon green-box">🛡️</div>

                            <div className="status-content">
                                <h4>Portal Status</h4>
                                <div className="status-main green-text">Active</div>
                                <div className="status-desc">
                                    All systems operational
                                </div>
                            </div>
                        </div>

                        <div className="status-item">
                            <div className="status-icon purple-box">🗄️</div>

                            <div className="status-content">
                                <h4>Database</h4>
                                <div className="status-main purple-text">
                                    Connected
                                </div>
                                <div className="status-desc">
                                    MongoDB Atlas
                                </div>
                            </div>
                        </div>

                        <div className="status-item">
                            <div className="status-icon green-box">🖥️</div>

                            <div className="status-content">
                                <h4>API Server</h4>
                                <div className="status-main green-text">
                                    Running
                                </div>
                                <div className="status-desc">
                                    All services active
                                </div>
                            </div>
                        </div>

                        <div className="status-item">
                            <div className="status-icon purple-box">🔄</div>

                            <div className="status-content">
                                <h4>Last Backup</h4>
                                <div className="status-main purple-text">
                                    Today, 02:30 AM
                                </div>
                                <div className="status-desc">
                                    Successfully completed
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default AdminDashboard;
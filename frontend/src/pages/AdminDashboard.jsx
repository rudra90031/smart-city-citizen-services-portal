import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminDashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
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
    const [stats, setStats] = useState({
        totalComplaints: 0,
        pendingComplaints: 0,
        resolvedComplaints: 0,
        pendingCertificates: 0,
        totalRevenue: 0,

        streetLight: 0,
        roadDamage: 0,
        waterSupply: 0,
        garbageCollection: 0
    });

    useEffect(() => {

        const fetchDashboard = async () => {
            try {

                const token = localStorage.getItem("adminToken");

                const res = await axios.get(
                    "http://localhost:5000/api/admin/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setStats(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchDashboard();

    }, []);

    const chartData = [
        {
            label: "Street Light",
            value: stats.streetLight,
            color: "#5D3FD3"
        },
        {
            label: "Road Damage",
            value: stats.roadDamage,
            color: "#7A5BEF"
        },
        {
            label: "Water Supply",
            value: stats.waterSupply,
            color: "#9B85F3"
        },
        {
            label: "Garbage Collection",
            value: stats.garbageCollection,
            color: "#273469"
        }
    ].filter(item => item.value > 0);
    console.log(stats);
    console.log(chartData);
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
                        <button className="notification-btn">🔔</button>
                    </div>

                </div>

                {/* Stats Cards */}

                <div className="stats-grid">

                    <div className="stat-card green">

                        <h4>Total Complaints</h4>

                        <h2>{stats.totalComplaints}</h2>

                        <p>↑ 15.2% from last month</p>

                        <div className="progress-line">
                            <span></span>
                        </div>

                    </div>

                    <div className="stat-card purple">

                        <h4>Pending Complaints</h4>

                        <h2>{stats.pendingComplaints}</h2>

                        <p>↑ 8.4% from last month</p>

                        <div className="progress-line">
                            <span></span>
                        </div>

                    </div>

                    <div className="stat-card green">

                        <h4>Resolved Complaints</h4>

                        <h2>{stats.resolvedComplaints}</h2>

                        <p>↑ 18.7% from last month</p>

                        <div className="progress-line">
                            <span></span>
                        </div>

                    </div>

                    <div className="stat-card purple">

                        <h4>Pending Certificates</h4>

                        <h2>{stats.pendingCertificates}</h2>

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
                                <h2>↑14%</h2>
                                <p> ↑14% from last month</p>
                            </div>

                            <div className="revenue-center">



                                <h1 className="revenue-amount">
                                    ₹{stats.totalRevenue}
                                </h1>

                            </div>

                        </div>

                    </div>

                    <div className="chart-card">

                        <h3>Complaint Category Distribution</h3>

                        <div className="chart-wrapper">
                            <Doughnut
                                data={{
                                    labels: chartData.map(item => item.label),
                                    datasets: [
                                        {
                                            data: chartData.map(item => item.value),
                                            backgroundColor: chartData.map(item => item.color),
                                            borderWidth: 0
                                        }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
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
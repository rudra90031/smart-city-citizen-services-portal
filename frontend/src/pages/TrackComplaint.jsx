import React, { useState } from "react";
import axios from "axios";
function TrackComplaint() {
    const [searched, setSearched] = useState(false);
    const [complaintId, setComplaintId] = useState("");
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleTrackComplaint = async () => {
        try {

            if (!complaintId.trim()) return;

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:5000/api/complaints/track/${complaintId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setComplaint(response.data);
            setSearched(true);

        } catch (error) {

            alert("Complaint Not Found");

            setComplaint(null);
            setSearched(false);

        } finally {

            setLoading(false);

        }
    };
    const status = complaint?.status || "";
    return (
        <div className="track-wrapper">

            <h1>Track Complaint</h1>

            <p className="track-subtitle">
                Track your complaint status in real time.
            </p>

            {/* Search Section */}

            <div className="track-search-row">

                <input
                    type="text"
                    placeholder="Enter Complaint ID"
                    value={complaintId}
                    onChange={(e) => setComplaintId(e.target.value)}
                />

                <button
                    onClick={handleTrackComplaint}
                >
                    Track →
                </button>

            </div>

            {/* Main Content */}

            <div className="track-content">

                {/* Left Side */}

                <div className="track-details">

                    <div className="track-field">
                        <label>COMPLAINT ID</label>
                        <p>{complaint?.complaintId}</p>
                    </div>

                    <div className="track-field">
                        <label>CATEGORY</label>
                        <p>{complaint?.category}</p>
                    </div>

                    <div className="track-field">
                        <label>LOCATION</label>
                        <p>
                            {searched
                                ? (complaint?.location?.area || "N/A")
                                : ""}
                        </p>
                    </div>

                    <div className="track-field">
                        <label>DESCRIPTION</label>
                        <p>{complaint?.description}</p>
                    </div>

                    <div className="track-field">
                        <label>DATE SUBMITTED</label>
                        <p>
                            {complaint?.createdAt
                                ? new Date(complaint.createdAt).toLocaleDateString()
                                : ""}
                        </p>
                    </div>

                    <div className="track-field">
                        <label>LAST UPDATED</label>
                        <p>
                            {complaint?.updatedAt
                                ? new Date(complaint.updatedAt).toLocaleDateString()
                                : ""}
                        </p>
                    </div>

                </div>

                {/* Right Side */}

                <div className="status-card">

                    <h2>Status History</h2>


                    <div className={`timeline-item ${complaint ? "active" : ""}`}>

                        <span></span>

                        <div className="timeline-content">
                            <h4>Complaint Submitted</h4>
                            <p>{searched ? "17 Jun 2026 • 10:30 AM" : ""}</p>
                        </div>

                    </div>

                    <div
                        className={`timeline-item ${complaint?.status === "In Progress" ||
                            complaint?.status === "Assigned" ||
                            complaint?.status === "Resolved"
                            ? "active"
                            : ""
                            }`}
                    >

                        <span></span>

                        <div className="timeline-content">
                            <h4>In Progress</h4>
                            <p>
                                {complaint?.status === "In Progress"
                                    ? new Date(complaint.updatedAt).toLocaleString()
                                    : ""}
                            </p>
                        </div>

                    </div>

                    <div
                        className={`timeline-item ${complaint?.status === "Assigned" ||
                            complaint?.status === "Resolved"
                            ? "active"
                            : ""
                            }`}
                    >

                        <span></span>

                        <div className="timeline-content">
                            <h4>Assigned To Technician</h4>
                            <p>
                                {complaint?.status === "Assigned"
                                    ? new Date(complaint.updatedAt).toLocaleString()
                                    : ""}
                            </p>
                        </div>

                    </div>

                    <div
                        className={`timeline-item ${complaint?.status === "Resolved"
                            ? "active"
                            : ""
                            }`}
                    >

                        <span></span>

                        <div className="timeline-content">
                            <h4>Resolved</h4>
                            <p>
                                {complaint?.status === "Resolved"
                                    ? new Date(complaint.updatedAt).toLocaleString()
                                    : ""}
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default TrackComplaint;
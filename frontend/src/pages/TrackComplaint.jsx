import React, { useState } from "react";
function TrackComplaint() {
    const [searched, setSearched] = useState(false);
    const [complaintId, setComplaintId] = useState("");
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
                    onClick={() => {
                        if (complaintId.trim()) {
                            setSearched(true);
                        }
                    }}
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
                        <p>{searched ? "CMP001" : ""}</p>
                    </div>

                    <div className="track-field">
                        <label>CATEGORY</label>
                        <p>{searched ? "Street Light" : ""}</p>
                    </div>

                    <div className="track-field">
                        <label>LOCATION</label>
                        <p>{searched ? "Sector 15, Near City Park" : ""}</p>
                    </div>

                    <div className="track-field">
                        <label>DESCRIPTION</label>
                        <p>{searched ? "Street light is not working from last 3 days." : ""}</p>
                    </div>

                    <div className="track-field">
                        <label>DATE SUBMITTED</label>
                        <p>{searched ? "17 June 2026" : ""}</p>
                    </div>

                    <div className="track-field">
                        <label>LAST UPDATED</label>
                        <p>{searched ? "18 June 2026" : ""}</p>
                    </div>

                </div>

                {/* Right Side */}

                <div className="status-card">

                    <h2>Status History</h2>

                    <div className={`timeline-item ${searched ? "active" : ""}`}>

                        <span></span>

                        <div className="timeline-content">
                            <h4>Complaint Submitted</h4>
                            <p>{searched ? "17 Jun 2026 • 10:30 AM" : ""}</p>
                        </div>

                    </div>

                    <div className={`timeline-item ${searched ? "active" : ""}`}>

                        <span></span>

                        <div className="timeline-content">
                            <h4>In Progress</h4>
                            <p>{searched ? "17 Jun 2026 • 02:15 PM" : ""}</p>
                        </div>

                    </div>

                    <div className="timeline-item">

                        <span></span>

                        <div className="timeline-content">
                            <h4>Assigned To Technician</h4>
                            <p>{searched ? "Pending" : ""}</p>
                        </div>

                    </div>

                    <div className="timeline-item">

                        <span></span>

                        <div className="timeline-content">
                            <h4>Resolved</h4>
                            <p>{searched ? "Pending" : ""}</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default TrackComplaint;
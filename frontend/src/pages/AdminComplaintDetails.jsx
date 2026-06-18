import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminComplaintDetails.css";

function AdminComplaintDetails() {

    const complaint = {
        complaintId: "SC-2026-0001",
        title: "Street Light Not Working",
        category: "Street Light",
        location: "Sector 15",
        description:
            "Street light has not been working for the last 3 days and the area becomes completely dark at night.",

        status: "Pending",

        citizenName: "Rudra Pratap Singh",
        email: "rudra@example.com",
        phone: "+91 9876543210",
        address: "Sector 15, Smart City",

        submittedOn: "18 Jun 2026",
        lastUpdated: "18 Jun 2026",
    };

    return (
        <>
            <AdminSidebar />

            <div className="complaint-details-page">

                <div className="details-header">

                    <button
                        className="back-btn"
                        onClick={() => window.history.back()}
                    >
                        ←
                    </button>

                    <div>
                        <h1>Complaint Details</h1>

                        <p>
                            Review complaint information and update status
                        </p>
                    </div>

                </div>

                <div className="details-grid">

                    {/* Left */}

                    <div className="details-card">

                        <h3>Complaint Information</h3>

                        <div className="info-row">
                            <span>Complaint ID</span>
                            <p>{complaint.complaintId}</p>
                        </div>

                        <div className="info-row">
                            <span>Title</span>
                            <p>{complaint.title}</p>
                        </div>

                        <div className="info-row">
                            <span>Category</span>
                            <p>{complaint.category}</p>
                        </div>

                        <div className="info-row">
                            <span>Location</span>
                            <p>{complaint.location}</p>
                        </div>

                        <div className="info-row">
                            <span>Description</span>
                            <p>{complaint.description}</p>
                        </div>

                        <div className="evidence-box">
                            <h4>Complaint Evidence</h4>

                            <div className="image-placeholder">
                                No Evidence Uploaded
                            </div>
                        </div>

                    </div>

                    {/* Right */}

                    <div className="right-column">

                        <div className="details-card">

                            <h3>Citizen Information</h3>

                            <div className="info-row">
                                <span>Name</span>
                                <p>{complaint.citizenName}</p>
                            </div>

                            <div className="info-row">
                                <span>Email</span>
                                <p>{complaint.email}</p>
                            </div>

                            <div className="info-row">
                                <span>Phone</span>
                                <p>{complaint.phone}</p>
                            </div>

                            <div className="info-row">
                                <span>Address</span>
                                <p>{complaint.address}</p>
                            </div>

                            <div className="info-row">
                                <span>Submitted On</span>
                                <p>{complaint.submittedOn}</p>
                            </div>

                            <div className="info-row">
                                <span>Last Updated</span>
                                <p>{complaint.lastUpdated}</p>
                            </div>

                        </div>

                        <div className="details-card">

                            <h3>Update Status</h3>

                            <select>
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Resolved</option>
                            </select>

                            <button className="update-btn">
                                Update Status
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default AdminComplaintDetails;
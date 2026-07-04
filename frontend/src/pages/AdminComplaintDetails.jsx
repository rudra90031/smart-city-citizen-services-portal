import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminComplaintDetails.css";

function AdminComplaintDetails() {
    const { id } = useParams();

    const [complaint, setComplaint] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchComplaint();
    }, []);
    const updateStatus = async () => {
        try {
            const token = localStorage.getItem("adminToken");

            await axios.put(
                `http://localhost:5000/api/complaints/admin/${id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Status Updated");

            fetchComplaint();

        } catch (error) {
            console.error(error);
            alert("Update Failed");
        }
    };


    const fetchComplaint = async () => {
        try {
            setLoading(true);

            
            const token = localStorage.getItem("adminToken");
            console.log("Admin Token:", token);

            const res = await axios.get(
                `http://localhost:5000/api/complaints/admin/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setComplaint(res.data);
            console.log("API Response:", res.data);
            setStatus(res.data.status);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    console.log(complaint);



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

                    {loading ? (

                        <div className="details-card">
                            <h3>Loading Complaint Details...</h3>
                        </div>

                    ) : (
                        <>

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
                                    <p>
                                        {complaint.location?.area} | Lat: {complaint.location?.latitude} | Lng: {complaint.location?.longitude}
                                    </p>
                                </div>

                                <div className="info-row">
                                    <span>Description</span>
                                    <p>{complaint.description}</p>
                                </div>

                                <div className="evidence-box">

                                    <h4>Complaint Evidence</h4>

                                    {complaint.image ? (

                                        <img
                                            src={`http://localhost:5000/uploads/${complaint.image}`}
                                            alt="Complaint Evidence"
                                            className="evidence-image"
                                        />

                                    ) : (

                                        <div className="image-placeholder">
                                            No Evidence Uploaded
                                        </div>

                                    )}

                                </div>

                            </div>

                            {/* Right */}

                            <div className="right-column">

                                <div className="details-card">

                                    <h3>Citizen Information</h3>

                                    <div className="info-row">
                                        <span>Name</span>
                                        <p>{complaint.user?.name}</p>
                                    </div>

                                    <div className="info-row">
                                        <span>Email</span>
                                        <p>{complaint.user?.email}</p>
                                    </div>

                                    <div className="info-row">
                                        <span>Phone</span>
                                        <p>{complaint.user?.mobile}</p>
                                    </div>

                                    <div className="info-row">
                                        <span>Address</span>
                                        <p>{complaint.location?.area}</p>
                                    </div>

                                    <div className="info-row">
                                        <span>Submitted On</span>
                                        <p>{new Date(complaint.createdAt).toLocaleDateString()}</p>
                                    </div>

                                    <div className="info-row">
                                        <span>Last Updated</span>
                                        <p>{new Date(complaint.updatedAt).toLocaleDateString()}</p>
                                    </div>

                                </div>

                                <div className="details-card">

                                    <h3>Update Status</h3>

                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option>Pending</option>
                                        <option>In Progress</option>
                                        <option>Resolved</option>
                                    </select>

                                    <button
                                        className="update-btn"
                                        onClick={updateStatus}
                                    >
                                        Update Status
                                    </button>

                                </div>

                            </div>
                        </>
                    )}
                </div>

            </div>
        </>
    );
}

export default AdminComplaintDetails;
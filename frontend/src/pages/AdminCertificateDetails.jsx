import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminCertificateDetails.css";

function AdminCertificateDetails() {


    const navigate = useNavigate();

    const { id } = useParams();

    const [application, setApplication] = useState(null);
    const [status, setStatus] = useState("Pending");
    const [remarks, setRemarks] = useState("");

    useEffect(() => {
        fetchCertificate();
    }, []);

    const fetchCertificate = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `http://localhost:5000/api/certificates/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setApplication(res.data);
            setStatus(res.data.status);
            console.log(res.data);

        } catch (error) {
            console.error(error);
        }
    };
    const handleStatusUpdate = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/certificates/${id}/status`,
                {
                    status,
                    adminRemarks: remarks,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Status Updated");
            fetchCertificate();

        } catch (error) {
            console.error(error);
        }
    };

    if (!application) {
        return <h2>Loading...</h2>;
    }
    console.log("APPLICATION DATA:", application);
    return (
        <>
            <AdminSidebar />

            <div className="cert-details-page">

                <div className="cert-details-header">

                    <button
                        className="cert-details-back-btn"
                        onClick={() => navigate("/admin/certificates")}
                    >
                        ←
                    </button>

                    <div>
                        <h1>Certificate Details</h1>

                        <p>
                            Review and verify certificate application
                        </p>
                    </div>

                </div>

                <div className="cert-details-grid">

                    {/* Certificate Information */}

                    <div className="cert-details-card">

                        <h3>Certificate Information</h3>

                        <div className="cert-details-info-row">
                            <span>Application ID</span>
                            <p>{application.applicationId}</p>
                        </div>

                        <div className="cert-details-info-row">
                            <span>Certificate Type</span>
                            <p>{application.certificateType}</p>
                        </div>

                        <div className="cert-details-info-row">
                            <span>Purpose</span>
                            <p>{application.purpose}</p>
                        </div>

                        <div className="cert-details-info-row">
                            <span>Submitted Date</span>
                            <p>{new Date(application.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className="cert-details-info-row">
                            <span>Status</span>
                            <p>{application.status}</p>
                        </div>

                        <div className="cert-details-info-row">
                            <span>Application ID</span>
                            <p>{application.applicationId}</p>
                        </div>

                    </div>

                    {/* Uploaded Documents */}

                    <div className="cert-details-card">

                        <h3>Uploaded Documents</h3>

                        <div className="cert-details-document-row">
                            <span>Aadhaar Card</span>

                            <div>
                                {application.aadhaarFile && (
                                    <>
                                        <span style={{ color: "green", marginRight: "10px" }}>
                                            ✓
                                        </span>

                                        <a
                                            href={`http://localhost:5000/uploads/${application.aadhaarFile}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="cert-details-document-btn"
                                        >
                                            View
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="cert-details-document-row">
                            <span>Supporting Document</span>

                            <div>
                                {application.supportingFile && (
                                    <>
                                        <span style={{ color: "green", marginRight: "10px" }}>
                                            ✓
                                        </span>

                                        <a
                                            href={`http://localhost:5000/uploads/${application.supportingFile}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="cert-details-document-btn"
                                        >
                                            View
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Citizen Information */}

                    <div className="cert-details-card">

                        <h3>Citizen Information</h3>

                        <div className="cert-details-info-row">
                            <span>Name</span>
                            <p>{application.user?.name}</p>
                        </div>

                        <div className="cert-details-info-row">
                            <span>Email</span>
                            <p>{application.user?.email}</p>
                        </div>

                        <div className="cert-details-info-row">
                            <span>Phone</span>
                            <p>{application.user?.mobile}</p>
                        </div>

                        <div className="cert-details-info-row">
                            <span>Address</span>
                            <p>{application.address}</p>
                        </div>

                    </div>

                </div>

                {/* Verification Section */}

                <div className="cert-details-action-card">

                    <h3>Verification & Approval</h3>

                    <select
                        className="cert-details-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option>Pending</option>
                        <option>Under Review</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                    </select>

                    <textarea
                        className="cert-details-textarea"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Enter admin remarks..."
                    />

                    <div className="cert-details-buttons">

                        <button className="cert-details-approve-btn">
                            Approve
                        </button>

                        <button className="cert-details-reject-btn">
                            Reject
                        </button>

                        <button
                            className="cert-details-update-btn"
                            onClick={handleStatusUpdate}
                        >
                            Update Status
                        </button>

                    </div>

                </div>

            </div>
        </>
    );


}

export default AdminCertificateDetails;

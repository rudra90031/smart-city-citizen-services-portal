import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminCertificateDetails.css";

function AdminCertificateDetails() {


const navigate = useNavigate();

const application = {
    id: "SC-CER-0001",
    certificateType: "Income Certificate",
    purpose: "Scholarship Application",
    submittedDate: "18 Jun 2026",
    status: "Pending",

    citizenName: "Rudra Pratap Singh",
    email: "rudra@example.com",
    phone: "+91 9876543210",
    address: "Sector 15, Smart City",

    certificateNumber: "INC-2026-0012"
};

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
                        <p>{application.id}</p>
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
                        <p>{application.submittedDate}</p>
                    </div>

                    <div className="cert-details-info-row">
                        <span>Certificate Number</span>
                        <p>{application.certificateNumber}</p>
                    </div>

                </div>

                {/* Uploaded Documents */}

                <div className="cert-details-card">

                    <h3>Uploaded Documents</h3>

                    <div className="cert-details-document-row">
                        <span>Aadhar Card</span>

                        <button className="cert-details-document-btn">
                            View
                        </button>
                    </div>

                    <div className="cert-details-document-row">
                        <span>Income Proof</span>

                        <button className="cert-details-document-btn">
                            View
                        </button>
                    </div>

                    <div className="cert-details-document-row">
                        <span>Passport Photo</span>

                        <button className="cert-details-document-btn">
                            View
                        </button>
                    </div>

                </div>

                {/* Citizen Information */}

                <div className="cert-details-card">

                    <h3>Citizen Information</h3>

                    <div className="cert-details-info-row">
                        <span>Name</span>
                        <p>{application.citizenName}</p>
                    </div>

                    <div className="cert-details-info-row">
                        <span>Email</span>
                        <p>{application.email}</p>
                    </div>

                    <div className="cert-details-info-row">
                        <span>Phone</span>
                        <p>{application.phone}</p>
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

                <select className="cert-details-select">
                    <option>Pending</option>
                    <option>Under Review</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                </select>

                <textarea
                    className="cert-details-textarea"
                    placeholder="Enter admin remarks..."
                />

                <div className="cert-details-buttons">

                    <button className="cert-details-approve-btn">
                        Approve
                    </button>

                    <button className="cert-details-reject-btn">
                        Reject
                    </button>

                    <button className="cert-details-update-btn">
                        Update Status
                    </button>

                </div>

            </div>

        </div>
    </>
);


}

export default AdminCertificateDetails;

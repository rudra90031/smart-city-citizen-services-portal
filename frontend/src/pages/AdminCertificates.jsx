import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminCertificates.css";

function AdminCertificates() {

    const navigate = useNavigate();

    const certificates = [
        {
            id: "SC-CER-0001",
            citizen: "Rudra Pratap Singh",
            type: "Income Certificate",
            date: "18 Jun 2026",
            status: "Pending",
        },
        {
            id: "SC-CER-0002",
            citizen: "Aman Sharma",
            type: "Birth Certificate",
            date: "17 Jun 2026",
            status: "Approved",
        },
        {
            id: "SC-CER-0003",
            citizen: "Neha Singh",
            type: "Domicile Certificate",
            date: "16 Jun 2026",
            status: "Under Review",
        },
        {
            id: "SC-CER-0004",
            citizen: "Rohit Kumar",
            type: "Character Certificate",
            date: "15 Jun 2026",
            status: "Rejected",
        },
    ];

    return (
        <>
            <AdminSidebar />

            <div className="cert-page">

                <div className="cert-header">

                    <div>
                        <h1>Certificate Management</h1>

                        <p>
                            Manage and verify citizen certificate applications
                        </p>
                    </div>

                    <button className="cert-export-btn">
                        Export CSV
                    </button>

                </div>

                <div className="cert-filters-box">

                    <input
                        type="text"
                        placeholder="Search Application ID or Citizen Name..."
                    />

                    <select>
                        <option>All Types</option>
                        <option>Income Certificate</option>
                        <option>Domicile Certificate</option>
                        <option>Birth Certificate</option>
                        <option>Character Certificate</option>
                    </select>

                    <select>
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Under Review</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                    </select>

                    <select>
                        <option>Newest First</option>
                        <option>Oldest First</option>
                    </select>

                </div>

                <div className="cert-quick-stats">

                    <span>Pending: 12</span>

                    <span>Under Review: 7</span>

                    <span>Approved: 84</span>

                    <span>Rejected: 3</span>

                </div>

                <div className="cert-table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>Application ID</th>
                                <th>Citizen</th>
                                <th>Certificate Type</th>
                                <th>Applied Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {certificates.map((item) => (

                                <tr key={item.id}>

                                    <td>{item.id}</td>

                                    <td>{item.citizen}</td>

                                    <td>{item.type}</td>

                                    <td>{item.date}</td>

                                    <td>

                                        <span
                                            className={`cert-status cert-${item.status
                                                .replace(" ", "-")
                                                .toLowerCase()}`}
                                        >
                                            {item.status}
                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="cert-view-btn"
                                            onClick={() =>
                                                navigate(`/admin/certificates/${item.id}`)
                                            }
                                        >
                                            View
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>
        </>
    );
}

export default AdminCertificates;
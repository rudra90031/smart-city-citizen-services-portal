import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminCertificates.css";

function AdminCertificates() {

    const navigate = useNavigate();
    const fetchCertificates = async () => {
        try {
            const token = localStorage.getItem("adminToken");

            const res = await axios.get(
                "http://localhost:5000/api/certificates/admin/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCertificates(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchCertificates();
    }, []);

    const [certificates, setCertificates] = useState([]);

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

                    <span>
                        Pending: {
                            certificates.filter(
                                (c) => c.status === "Pending"
                            ).length
                        }
                    </span>

                    <span>
                        Approved: {
                            certificates.filter(
                                (c) => c.status === "Approved"
                            ).length
                        }
                    </span>

                    <span>
                        Rejected: {
                            certificates.filter(
                                (c) => c.status === "Rejected"
                            ).length
                        }
                    </span>

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

                                <tr key={item._id}>

                                    <td>{item.applicationId}</td>

                                    <td>{item.user?.name}</td>

                                    <td>{item.certificateType}</td>

                                    <td>
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>

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
                                                navigate(`/admin/certificates/${item._id}`)
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
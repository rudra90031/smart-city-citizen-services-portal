import React, { useState, useEffect } from "react";
import "../assets/styles/certificates.css";
import RevealText from "../components/RevealText";
import "../assets/styles/revealText.css";
import axios from "axios";
function Certificates() {
    const [purpose, setPurpose] = useState("");
    const [certificates, setCertificates] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const documentRequirements = {
        "Birth Certificate": [
            "Aadhaar Card",
            "Birth Proof / Hospital Record"
        ],

        "Domicile Certificate": [
            "Aadhaar Card",
            "Address Proof"
        ],

        "Income Certificate": [
            "Aadhaar Card",
            "Income Proof"
        ],

        "Character Certificate": [
            "Aadhaar Card",
            "Passport Size Photo"
        ]
    };
    const supportingDocumentLabels = {
        "Birth Certificate": "UPLOAD BIRTH PROOF",
        "Domicile Certificate": "UPLOAD ADDRESS PROOF",
        "Income Certificate": "UPLOAD INCOME PROOF",
        "Character Certificate": "UPLOAD PASSPORT SIZE PHOTO"
    };
    const [selectedCertificate, setSelectedCertificate] =
        useState("Birth Certificate");
    const fetchCertificates = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/certificates",
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
    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/auth/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setName(res.data.name || "");
            setEmail(res.data.email || "");
            setMobile(res.data.mobile || "");
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchCertificates();
        fetchUserProfile();
    }, []);
    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:5000/api/certificates",
                {
                    certificateType: selectedCertificate,
                    purpose,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Certificate Application Submitted");

            fetchCertificates();
            setPurpose("");
        } catch (error) {
            console.error(error);
            alert("Submission Failed");
        }
    };
    return (<div className="certificate-wrapper">

        ```
        <div className="certificate-hero">

            <RevealText text="Apply For Certificates" />

            <p>
                Apply and track government certificates online.
            </p>

        </div>

        <div className="certificate-divider"></div>

        <div className="certificate-content">

            {/* Left Side */}

            <div className="certificate-form">

                <div className="form-group">
                    <label>SELECT CERTIFICATE</label>

                    <select
                        value={selectedCertificate}
                        onChange={(e) =>
                            setSelectedCertificate(e.target.value)
                        }
                    >
                        <option>Birth Certificate</option>
                        <option>Domicile Certificate</option>
                        <option>Income Certificate</option>
                        <option>Character Certificate</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>APPLICANT NAME</label>
                    <input
                        type="text"
                        value={name}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>EMAIL</label>
                    <input
                        type="email"
                        value={email}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>PHONE NUMBER</label>
                    <input
                        type="text"
                        value={mobile}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>ADDRESS</label>
                    <input
                        type="text"
                        placeholder="Enter Address"
                    />
                </div>

                <div className="form-group">
                    <label>PURPOSE OF APPLICATION</label>
                    <input
                        type="text"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="College Admission / Passport / Government Job"
                    />
                </div>

                <div className="form-group">
                    <label>AADHAAR CARD</label>
                    <input type="file" />
                </div>

                <div className="form-group">
                    <label>
                        {supportingDocumentLabels[selectedCertificate]}
                    </label>
                    <input type="file" />
                </div>

                <div className="required-documents">

                    <h4>Required Documents</h4>

                    <ul>
                        {documentRequirements[selectedCertificate].map(
                            (doc, index) => (
                                <li key={index}>
                                    ✓ {doc}
                                </li>
                            )
                        )}
                    </ul>

                </div>

                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                >
                    Submit Application →
                </button>

            </div>

            {/* Right Side */}

            <div className="applications-section">
                <h2>My Applications</h2>

                {certificates.map((cert) => (
                    <div className="application-item" key={cert._id}>
                        <div>
                            <h4>{cert.certificateType}</h4>
                            <p>
                                Application ID: {cert.applicationId}
                            </p>

                            <p>
                                Purpose: {cert.purpose}
                            </p>

                            <p>
                                Applied on:{" "}
                                {new Date(cert.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        <span
                            className={`status ${cert.status
                                .toLowerCase()
                                .replace(" ", "-")}`}
                        >
                            {cert.status}
                        </span>
                    </div>
                ))}
            </div>

        </div>

    </div>
    );
}

export default Certificates;

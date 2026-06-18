import React, { useState } from "react";
import "../assets/styles/certificates.css";
import RevealText from "../components/RevealText";
import "../assets/styles/revealText.css";

function Certificates() {
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
                        placeholder="Enter Name"
                    />
                </div>

                <div className="form-group">
                    <label>EMAIL</label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                    />
                </div>

                <div className="form-group">
                    <label>PHONE NUMBER</label>
                    <input
                        type="text"
                        placeholder="Enter Phone Number"
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

                <button className="submit-btn">
                    Submit Application →
                </button>

            </div>

            {/* Right Side */}

            <div className="applications-section">

                <h2>My Applications</h2>

                <div className="application-item">

                    <div>
                        <h4>Birth Certificate</h4>

                        <p className="application-id">
                            Application ID: CERT-2026-001
                        </p>

                        <p>
                            Applied on: 12 May 2026
                        </p>
                    </div>

                    <span className="status progress">
                        In Progress
                    </span>

                </div>

                <div className="application-item">

                    <div>
                        <h4>Domicile Certificate</h4>

                        <p className="application-id">
                            Application ID: CERT-2026-002
                        </p>

                        <p>
                            Applied on: 10 May 2026
                        </p>
                    </div>

                    <span className="status approved">
                        Approved
                    </span>

                </div>

                <div className="application-item">

                    <div>
                        <h4>Income Certificate</h4>

                        <p className="application-id">
                            Application ID: CERT-2026-003
                        </p>

                        <p>
                            Applied on: 06 May 2026
                        </p>
                    </div>

                    <span className="status rejected">
                        Rejected
                    </span>

                </div>

            </div>

        </div>

    </div>
    );
}

export default Certificates;

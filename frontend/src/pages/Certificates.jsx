import React from "react";
import "../assets/styles/certificates.css";
import RevealText from "../components/RevealText";
import "../assets/styles/revealText.css";
function Certificates() {
    return (
        <div className="certificate-wrapper">

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

                        <select>
                            <option>Birth Certificate</option>
                            <option>Domicile Certificate</option>
                            <option>Income Certificate</option>
                            <option>Death Certificate</option>
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
                        <label>ADDRESS</label>
                        <input
                            type="text"
                            placeholder="Enter Address"
                        />
                    </div>

                    <div className="form-group">
                        <label>UPLOAD DOCUMENT</label>
                        <input type="file" />
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
                            <p>Applied on: 12 May 2026</p>
                        </div>

                        <span className="status progress">
                            In Progress
                        </span>
                    </div>

                    <div className="application-item">
                        <div>
                            <h4>Domicile Certificate</h4>
                            <p>Applied on: 10 May 2026</p>
                        </div>

                        <span className="status approved">
                            Approved
                        </span>
                    </div>

                    <div className="application-item">
                        <div>
                            <h4>Income Certificate</h4>
                            <p>Applied on: 06 May 2026</p>
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
import { useState, useEffect } from "react";
import axios from "axios";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminGISMap.css";

function AdminGISMap() {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

     useEffect(() => {

        fetchComplaints();

    }, []);

    const fetchComplaints = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/complaints"
            );

            setComplaints(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (
        <div className="admin-layout">

            <AdminSidebar />

            <div className="gis-page">

                <div className="gis-header">
                    <h1>GIS Complaint Mapping</h1>
                    <p>Visualize and monitor city complaints.</p>
                </div>

                <div className="gis-filters">

                    <input
                        type="text"
                        placeholder="Search Complaint ID / Citizen / Area"
                    />

                    <select>
                        <option>All Categories</option>
                        <option>Water</option>
                        <option>Road</option>
                        <option>Garbage</option>
                        <option>Street Light</option>
                    </select>

                    <select>
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                    </select>

                </div>

                <div className="gis-content">

                    <div className="map-section">

                        <MapContainer
                            center={[29.9457, 78.1642]}
                            zoom={13}
                            scrollWheelZoom={true}
                            className="map"
                        >
                            <TileLayer
                                attribution="OpenStreetMap"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </MapContainer>

                    </div>

                    <div className="details-panel">

                        <h2>Complaint Details</h2>

                        <div className="detail-row">
                            <span>Complaint ID</span>
                            <strong>---</strong>
                        </div>

                        <div className="detail-row">
                            <span>Citizen</span>
                            <strong>---</strong>
                        </div>

                        <div className="detail-row">
                            <span>Category</span>
                            <strong>---</strong>
                        </div>

                        <div className="detail-row">
                            <span>Status</span>
                            <strong>---</strong>
                        </div>

                        <div className="detail-row">
                            <span>Area</span>
                            <strong>---</strong>
                        </div>

                        <div className="detail-row">
                            <span>Description</span>
                            <strong>---</strong>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminGISMap;
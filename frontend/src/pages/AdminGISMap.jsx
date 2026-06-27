import { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";
import { useMap } from "react-leaflet";

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

const redIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const orangeIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const greenIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const greyIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const getMarkerIcon = (status) => {

    switch (status) {

        case "Resolved":
            return greenIcon;

        case "In Progress":
            return orangeIcon;

        case "Rejected":
            return greyIcon;

        default:
            return redIcon;
    }

};
function MapFocus({ lat, lng }) {

    const map = useMap();

    useEffect(() => {

        map.flyTo([lat, lng], 16, {
            duration: 1.5
        });

    }, [lat, lng, map]);

    return null;

}

function AdminGISMap() {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [categoryFilter, setCategoryFilter] = useState("All");
    const [focusLocation, setFocusLocation] = useState(null);

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
    const total = complaints.length;

    const pending = complaints.filter(
        c => c.status === "Pending"
    ).length;

    const progress = complaints.filter(
        c => c.status === "In Progress"
    ).length;

    const resolved = complaints.filter(
        c => c.status === "Resolved"
    ).length;

    const rejected = complaints.filter(
        c => c.status === "Rejected"
    ).length;

    const waterCount =
        complaints.filter(c => c.category === "Water").length;

    const roadCount =
        complaints.filter(c => c.category === "Road").length;

    const garbageCount =
        complaints.filter(c => c.category === "Garbage").length;

    const lightCount =
        complaints.filter(c => c.category === "Street Light").length;

    const hotspotAreas = Object.entries(

        complaints.reduce((acc, complaint) => {

            const area = complaint.area || "Unknown";

            acc[area] = (acc[area] || 0) + 1;

            return acc;

        }, {})

    )

        .sort((a, b) => b[1] - a[1])

        .slice(0, 5);

    const filteredComplaints = complaints.filter((c) => {

        const searchMatch =

            c.complaintId?.toLowerCase().includes(search.toLowerCase()) ||

            c.area?.toLowerCase().includes(search.toLowerCase()) ||

            c.citizenName?.toLowerCase().includes(search.toLowerCase());

        const statusMatch =

            statusFilter === "All"

                ? true

                : c.status === statusFilter;

        const categoryMatch =

            categoryFilter === "All"

                ? true

                : c.category === categoryFilter;

        return searchMatch && statusMatch && categoryMatch;

    });

    return (
        <div className="admin-layout">

            <AdminSidebar />

            <div className="gis-page">

                <div className="gis-header">
                    <h1>GIS Complaint Mapping</h1>
                    <p>Visualize and monitor city complaints.</p>
                </div>

                <div className="gis-topbar">



                    <div className="gis-right-info">

                        <div className="gis-stats">

                            <span className="stat-box total">

                                Total {total}

                            </span>

                            <span className="stat-box pending">

                                Pending {pending}

                            </span>

                            <span className="stat-box progress">

                                Progress {progress}

                            </span>

                            <span className="stat-box resolved">

                                Resolved {resolved}

                            </span>

                            <span className="stat-box rejected">

                                Rejected {rejected}

                            </span>

                        </div>

                        <div className="category-strip">

                            <span className="category-pill">
                                Water {waterCount}
                            </span>

                            <span className="category-pill">
                                Road {roadCount}
                            </span>

                            <span className="category-pill">
                                Garbage {garbageCount}
                            </span>

                            <span className="category-pill">
                                Street Light {lightCount}
                            </span>

                        </div>

                    </div>

                </div>

                <div className="gis-filters">

                    <input
                        placeholder="Search Complaint ID / Citizen / Area"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Water">Water</option>
                        <option value="Road">Road</option>
                        <option value="Garbage">Garbage</option>
                        <option value="Street Light">Street Light</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
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
                            {

                                filteredComplaints.map((complaint) => (

                                    <Marker
                                        key={complaint._id}
                                        position={[
                                            Number(complaint.latitude),
                                            Number(complaint.longitude)
                                        ]}
                                        icon={getMarkerIcon(complaint.status)}
                                        eventHandlers={{
                                            click: () => {

                                                setSelectedComplaint(complaint);

                                            }
                                        }}
                                    >

                                        <Popup>

                                            <b>{complaint.complaintId}</b>

                                            <br />

                                            {complaint.category}

                                            <br />

                                            {complaint.status}

                                            <br />

                                            {complaint.area}

                                            <br /><br />

                                            <button
                                                className="popup-btn"
                                                onClick={() => setSelectedComplaint(complaint)}
                                            >
                                                View Details
                                            </button>

                                        </Popup>

                                    </Marker>

                                ))

                            }
                            {
                                focusLocation &&

                                <MapFocus
                                    lat={focusLocation.lat}
                                    lng={focusLocation.lng}
                                />

                            }
                        </MapContainer>
                        <div className="map-legend">

                            <div>
                                <span className="legend red-dot"></span>
                                Pending
                            </div>

                            <div>
                                <span className="legend orange-dot"></span>
                                In Progress
                            </div>

                            <div>
                                <span className="legend green-dot"></span>
                                Resolved
                            </div>

                            <div>
                                <span className="legend grey-dot"></span>
                                Rejected
                            </div>

                        </div>
                        <div className="gis-bottom">

                            <div className="hotspot-card">

                                <h3>Hotspot Areas</h3>

                                <div
                                    className="hotspot-item danger"
                                    onClick={() =>
                                        setFocusLocation({
                                            lat: 29.954,
                                            lng: 78.164
                                        })
                                    }
                                >

                                    <span>1. Sector 15</span>
                                    <span>12 Complaints</span>

                                </div>

                                <div
                                    className="hotspot-item warning"
                                    onClick={() =>
                                        setFocusLocation({
                                            lat: 29.947,
                                            lng: 78.156
                                        })
                                    }
                                >

                                    <span>2. Railway Road</span>
                                    <span>8 Complaints</span>

                                </div>

                                <div
                                    className="hotspot-item"
                                    onClick={() =>
                                        setFocusLocation({
                                            lat: 29.942,
                                            lng: 78.171
                                        })
                                    }
                                >

                                    <span>3. BHEL Colony</span>
                                    <span>5 Complaints</span>

                                </div>

                            </div>

                            <div className="nearby-card">

                                <h3>Nearby Complaints</h3>

                                {

                                    selectedComplaint ?

                                        complaints

                                            .filter(c =>

                                                c.area === selectedComplaint.area &&

                                                c._id !== selectedComplaint._id

                                            )

                                            .slice(0, 5)

                                            .map(c => (

                                                <div
                                                    key={c._id}
                                                    className="hotspot-row"
                                                >

                                                    <span>

                                                        {c.complaintId}

                                                    </span>

                                                    <strong>

                                                        {c.status}

                                                    </strong>

                                                </div>

                                            ))

                                        :

                                        <p>

                                            Select a complaint marker.

                                        </p>

                                }

                            </div>

                        </div>

                    </div>

                    <div className="details-panel">

                        {
                            selectedComplaint && (

                                <div
                                    className={`hotspot-badge ${pending >= 10 ? "danger" :
                                        pending >= 5 ? "warning" :
                                            "safe"
                                        }`}
                                >

                                    {
                                        pending >= 10
                                            ? "🔴 High Complaint Zone"
                                            : pending >= 5
                                                ? "🟡 Medium Complaint Zone"
                                                : "🟢 Low Complaint Zone"
                                    }

                                </div>

                            )
                        }

                        <h2>Complaint Details</h2>

                        {
                            selectedComplaint && (

                                <div className="detail-actions">

                                    <button
                                        className="navigate-btn"
                                        onClick={() => {
                                            window.open(
                                                `https://www.google.com/maps?q=${selectedComplaint.latitude},${selectedComplaint.longitude}`
                                            );
                                        }}
                                    >

                                        Navigate

                                    </button>

                                    <button
                                        className="assign-btn"
                                    >

                                        Assign Team

                                    </button>

                                </div>

                            )
                        }

                        <div className="detail-row">

                            <span>Complaint ID</span>

                            <strong>

                                {selectedComplaint?.complaintId || "---"}

                            </strong>

                        </div>

                        <div className="detail-row">

                            <span>Citizen</span>

                            <strong>

                                {selectedComplaint?.citizenName || "---"}

                            </strong>

                        </div>

                        <div className="detail-row">

                            <span>Category</span>

                            <strong>

                                {selectedComplaint?.category || "---"}

                            </strong>

                        </div>

                        <div className="detail-row">

                            <span>Status</span>

                            <strong>

                                {selectedComplaint?.status || "---"}

                            </strong>

                        </div>

                        <div className="detail-row">

                            <span>Area</span>

                            <strong>

                                {selectedComplaint?.area || "---"}

                            </strong>

                        </div>

                        <div className="detail-row">

                            <span>Description</span>

                            {
                                selectedComplaint?.image && (

                                    <div className="gis-photo">

                                        <img
                                            src={selectedComplaint.image}
                                            alt="complaint"
                                        />

                                    </div>

                                )
                            }

                            <strong>

                                {selectedComplaint?.description || "---"}

                            </strong>

                        </div>

                        {
                            selectedComplaint && (

                                <div className="nearby-box">

                                    <h4>

                                        Nearby Complaints

                                    </h4>

                                    {

                                        complaints

                                            .filter(c =>

                                                c.area === selectedComplaint.area &&

                                                c._id !== selectedComplaint._id

                                            )

                                            .slice(0, 3)

                                            .map(c => (

                                                <p key={c._id}>

                                                    • {c.complaintId}

                                                </p>

                                            ))

                                    }

                                </div>

                            )
                        }

                        {
                            selectedComplaint && (
                                <>
                                    <div className="location-box">

                                        <h4>Location</h4>

                                        <p>
                                            Latitude : {selectedComplaint.latitude}
                                        </p>

                                        <p>
                                            Longitude : {selectedComplaint.longitude}
                                        </p>

                                        <p>
                                            Area : {selectedComplaint.area}
                                        </p>

                                    </div>

                                    <div className="analytics-box">

                                        <h4>Complaint Analytics</h4>

                                        <div className="analytics-grid">

                                            <div className="analytics-item">
                                                <span>Priority</span>
                                                <strong>{selectedComplaint.priority || "Medium"}</strong>
                                            </div>

                                            <div className="analytics-item">
                                                <span>Department</span>
                                                <strong>{selectedComplaint.department || "Municipal"}</strong>
                                            </div>

                                            <div className="analytics-item">
                                                <span>Reported</span>
                                                <strong>
                                                    {selectedComplaint.createdAt
                                                        ? new Date(selectedComplaint.createdAt).toLocaleDateString()
                                                        : "--"}
                                                </strong>
                                            </div>

                                            <div className="analytics-item">
                                                <span>Updated</span>
                                                <strong>
                                                    {selectedComplaint.updatedAt
                                                        ? new Date(selectedComplaint.updatedAt).toLocaleDateString()
                                                        : "--"}
                                                </strong>
                                            </div>

                                        </div>

                                    </div>
                                </>
                            )
                        }

                    </div>

                </div>

                <div className="gis-bottom">




                </div>

            </div>

        </div>
    );
}

export default AdminGISMap;
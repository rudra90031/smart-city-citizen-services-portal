import { MapContainer, TileLayer } from "react-leaflet";

const AdminGISMap = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
            }}
        >
            <MapContainer
                center={[29.8543, 77.8880]}
                zoom={13}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
};

export default AdminGISMap;
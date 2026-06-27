import { useState, useEffect, useRef } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap
} from "react-leaflet";

import { MdNavigation } from "react-icons/md";

import "leaflet/dist/leaflet.css";

import "../assets/styles/locationPicker.css";

function LocationMarker({
    position,
    setPosition,
    setLatitude,
    setLongitude,
    setArea
}) {

    useMapEvents({

        click: async (e) => {

            setPosition(e.latlng);

            setLatitude(e.latlng.lat.toFixed(6));

            setLongitude(e.latlng.lng.toFixed(6));

            const reverse = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
            );

            const reverseData = await reverse.json();
            console.log("Map Click:", reverseData);
            console.log("Map Address:", reverseData.address);

            setArea(
                reverseData.address?.road ||
                reverseData.address?.residential ||
                reverseData.address?.hamlet ||      // <-- ADD THIS
                reverseData.address?.suburb ||
                reverseData.address?.neighbourhood ||
                reverseData.address?.quarter ||
                reverseData.address?.city_district ||
                reverseData.address?.village ||
                reverseData.address?.town ||
                reverseData.address?.city ||
                reverseData.display_name ||
                "Unknown Area"
            );

        }

    });

    if (!position) return null;

    return <Marker position={position} />;
}

function FlyToLocation({ position }) {

    const map = useMap();

    if (position) {
        map.flyTo(position, 17, {
            duration: 1.5
        });
    }

    return null;
}

function LocationPicker({ onClose, onConfirm }) {

    const [position, setPosition] = useState(null);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [area, setArea] = useState("");
    const [searchText, setSearchText] = useState("");

    const [suggestions, setSuggestions] = useState([]);

    const [loadingSearch, setLoadingSearch] = useState(false);
    const searchRef = useRef(null);

    const getCurrentLocation = () => {

        setSuggestions([]);

        if (!navigator.geolocation) {

            alert("Geolocation is not supported.");

            return;
        }

        navigator.geolocation.getCurrentPosition(

            async (location) => {

                const lat = location.coords.latitude;
                const lng = location.coords.longitude;

                setPosition({
                    lat,
                    lng
                });

                setLatitude(lat.toFixed(6));
                setLongitude(lng.toFixed(6));

                const reverse = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
                );

                const reverseData = await reverse.json();
                console.log("Current Location:", reverseData);
                console.log("Current Address:", reverseData.address);

                setArea(
                    reverseData.address?.road ||
                    reverseData.address?.residential ||
                    reverseData.address?.hamlet ||      // <-- ADD THIS
                    reverseData.address?.suburb ||
                    reverseData.address?.neighbourhood ||
                    reverseData.address?.quarter ||
                    reverseData.address?.city_district ||
                    reverseData.address?.village ||
                    reverseData.address?.town ||
                    reverseData.address?.city ||
                    reverseData.display_name ||
                    "Unknown Area"
                );

            },

            (error) => {

                console.error(error);

                alert("Unable to get current location.");

            }

        );
    };

    useEffect(() => {

        const handleOutsideClick = (e) => {

            if (
                searchRef.current &&
                !searchRef.current.contains(e.target)
            ) {
                setSuggestions([]);
            }

        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

        };

    }, []);

    const searchPlace = async (query) => {

        setSearchText(query);

        if (query.trim().length < 2) {

            setSuggestions([]);

            return;

        }

        setLoadingSearch(true);

        try {

            const response = await fetch(

                `https://photon.komoot.io/api/?q=${encodeURIComponent(
                    query + " Haridwar Uttarakhand India"
                )}&limit=8`

            );

            const data = await response.json();

            setSuggestions(data.features);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoadingSearch(false);

        }

    };


    return (
        <div className="location-overlay">

            <div className="location-modal">

                <div className="location-header">

                    <h2>Select Complaint Location</h2>

                    <div className="header-actions">

                        <button
                            className="current-location-btn"
                            onClick={getCurrentLocation}
                        >
                            <MdNavigation className="location-icon" />
                            <span>Use My Current Location</span>
                        </button>

                        <button
                            className="close-btn"
                            onClick={onClose}
                        >
                            ×
                        </button>

                    </div>

                </div>

                <div
                    className="search-wrapper"
                    ref={searchRef}
                >

                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search Area, Colony, Landmark..."
                        value={searchText}
                        onChange={(e) => searchPlace(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchPlace(searchText);
                            }
                        }}
                    />

                    {
                        suggestions.length > 0 && (

                            <div className="suggestion-box">

                                {
                                    suggestions.map((item, index) => (

                                        <div
                                            key={index}
                                            className="suggestion"
                                            onClick={() => {

                                                const lat = item.geometry.coordinates[1];
                                                const lng = item.geometry.coordinates[0];

                                                setPosition({ lat, lng });

                                                setLatitude(lat.toFixed(6));

                                                setLongitude(lng.toFixed(6));

                                                setArea(
                                                    item.properties.name ||
                                                    item.properties.city ||
                                                    ""
                                                );

                                                setSearchText(item.properties.name);

                                                setSuggestions([]);

                                            }}
                                        >

                                            <strong>
                                                {item.properties.name}
                                            </strong>

                                            <small>
                                                {
                                                    item.properties.city ||
                                                    item.properties.state ||
                                                    item.properties.country
                                                }
                                            </small>

                                        </div>

                                    ))
                                }

                            </div>

                        )
                    }

                </div>

                <div className="location-map">

                    <MapContainer
                        center={[29.9457, 78.1642]}
                        zoom={13}
                        className="picker-map"
                    >

                        <TileLayer
                            attribution="OpenStreetMap"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <FlyToLocation
                            position={position}
                        />

                        <LocationMarker
                            position={position}
                            setPosition={setPosition}
                            setLatitude={setLatitude}
                            setLongitude={setLongitude}
                            setArea={setArea}
                        />

                    </MapContainer>

                </div>

                <div className="location-info">

                    <p>
                        <strong>Latitude :</strong> {latitude || "---"}
                    </p>

                    <p>
                        <strong>Longitude :</strong> {longitude || "---"}
                    </p>

                    <p>
                        <strong>Area :</strong> {area || "---"}
                    </p>

                </div>

                <button
                    className="confirm-btn"
                    disabled={!position}
                    onClick={() => {

                        onConfirm({
                            latitude,
                            longitude,
                            area
                        });

                        onClose();

                    }}
                >
                    Confirm Location
                </button>

            </div>

        </div>
    );
}
export default LocationPicker;
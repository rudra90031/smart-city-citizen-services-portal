import React, { useState } from "react";
import axios from "axios";
import LocationPicker from "../components/LocationPicker";
function LodgeComplaint() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Street Light");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: "",
    longitude: "",
    area: ""
  });
  const handleSubmit = async (e) => {
    if (!selectedLocation.latitude) {
      alert("Please select complaint location");
      return;
    }
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append(
        "location",
        JSON.stringify({
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          area: selectedLocation.area,
        })
      );
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post(
        "http://localhost:5000/api/complaints",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Complaint Submitted Successfully");

      setTitle("");
      setCategory("Street Light");
      setLocation("");
      setDescription("");
      setImage(null);

      console.log(res.data);
      console.log(image);

    } catch (error) {
      console.error(error);
      alert("Failed To Submit Complaint");
    }
  };
  return (
    <section className="lodge-form-section">

      <h1>Lodge New Complaint</h1>

      <p>
        Report civic issues and help improve your city.
      </p>

      <form className="form-grid" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Complaint Title</label>
          <input
            type="text"
            placeholder="Street Light Not Working"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Street Light</option>
            <option>Road Damage</option>
            <option>Water Supply</option>
            <option>Garbage Collection</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label>Location</label>

          {
            selectedLocation.latitude ? (

              <div className="location-details">

                <div className="location-item">
                  <strong>Area</strong>
                  <span>{selectedLocation.area || "Not Selected"}</span>
                </div>

                <div className="location-item">
                  <strong>Latitude</strong>
                  <span>{selectedLocation.latitude}</span>
                </div>

                <div className="location-item">
                  <strong>Longitude</strong>
                  <span>{selectedLocation.longitude}</span>
                </div>

                <button
                  type="button"
                  className="change-location-btn"
                  onClick={() => setShowLocationPicker(true)}
                >
                  Change Location
                </button>

              </div>

            ) : (

              <button
                type="button"
                className="location-btn"
                onClick={() => setShowLocationPicker(true)}
              >
                Select Complaint Location
              </button>

            )
          }
        </div>

        <div className="form-group full-width">
          <label>Description</label>

          <textarea
            placeholder="Describe the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group full-width">

          <label>Upload Evidence (Optional)</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <small>
            Upload a photo of the issue (JPG, PNG, JPEG)
          </small>

        </div>

        <button
          type="submit"
          className="submit-btn"
        >
          Submit Complaint →
        </button>

      </form>

      {
        showLocationPicker && (

          <LocationPicker

            onClose={() => setShowLocationPicker(false)}

            onConfirm={(location) => {

              setSelectedLocation(location);

              setShowLocationPicker(false);

            }}

          />

        )
      }

    </section>
  );
}

export default LodgeComplaint;
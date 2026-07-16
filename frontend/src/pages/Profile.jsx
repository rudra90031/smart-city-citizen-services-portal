import "../assets/styles/profile.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    useEffect(() => {

        if (user) {

            setName(user.name || "");
            setEmail(user.email || "");
            setPhone(user.mobile || "");
            setProfilePic(
                user.profilePic
                    ? `http://localhost:5000${user.profilePic}`
                    : ""
            );

        }

    }, []);

    const updateProfile = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const formData = new FormData();

            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);

            if (
                document.getElementById("profilePic").files[0]
            ) {
                formData.append(
                    "profilePic",
                    document.getElementById("profilePic").files[0]
                );
            }

            const res = await axios.put(
                `http://localhost:5000/api/auth/${user.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const updatedUser = {
                ...user,
                ...res.data,
            };

            console.log("Response:", JSON.stringify(res.data, null, 2));
            console.log("Stored User:", JSON.stringify(updatedUser, null, 2));

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            setProfilePic(
                updatedUser.profilePic
                    ? `http://localhost:5000${updatedUser.profilePic}`
                    : ""
            );

            alert("Profile Updated Successfully");

        }

        catch (err) {

            console.log(err);

        }

    };

    const changePassword = async () => {

        if (newPassword !== confirmPassword) {

            alert("Passwords do not match");

            return;

        }

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            await axios.put(

                `http://localhost:5000/api/users/change-password/${user.id}`,

                {

                    currentPassword,
                    newPassword

                }

            );

            alert("Password Updated");

        }

        catch (err) {

            console.log(err);

        }

    };

    const uploadImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setProfilePic(URL.createObjectURL(file));
    };

    return (

        <div id="profile" className="profile-page">

            <section className="profile-section">

                <div className="profile-header">

                    <div className="profile-avatar-wrapper">

                        <div className="profile-avatar">
                            {profilePic ? (
                                <img
                                    src={profilePic}
                                    alt="Profile"
                                />
                            ) : (
                                name
                                    ? name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
                                    : "U"
                            )}
                        </div>

                        <input
                            type="file"
                            id="profilePic"
                            hidden
                            onChange={uploadImage}
                        />

                        <label
                            htmlFor="profilePic"
                            className="edit-avatar"
                        >
                            ✎
                        </label>

                    </div>

                    <div className="profile-info">

                        <h2>{name}</h2>

                        <p>{email}</p>

                    </div>

                </div>

                <div className="profile-grid">

                    <div className="profile-card">

                        <h3>Personal Details</h3>

                        <label>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Mobile Number</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <button
                            className="save-btn"
                            onClick={updateProfile}
                        >
                            Save Changes
                        </button>

                    </div>

                    <div className="profile-card">

                        <h3>Change Password</h3>

                        <label>Current Password</label>
                        <input

                            type="password"

                            value={currentPassword}

                            onChange={(e) => setCurrentPassword(e.target.value)}

                        />

                        <label>New Password</label>
                        <input

                            type="password"

                            value={newPassword}

                            onChange={(e) => setNewPassword(e.target.value)}

                        />

                        <label>Confirm Password</label>
                        <input

                            type="password"

                            value={confirmPassword}

                            onChange={(e) => setConfirmPassword(e.target.value)}

                        />

                        <button

                            className="save-btn"

                            onClick={changePassword}

                        >
                            Update Password
                        </button>

                    </div>

                    <div className="profile-card">

                        <h3>Account Information</h3>

                        <div className="info-row">
                            <span>Citizen ID</span>
                            <strong>SC-2026-0015</strong>
                        </div>

                        <div className="info-row">
                            <span>Account Status</span>
                            <strong className="active-status">
                                Active
                            </strong>
                        </div>

                        <div className="info-row">
                            <span>Registered On</span>
                            <strong>15 Jan 2026</strong>
                        </div>

                        <div className="info-row">
                            <span>Last Login</span>
                            <strong>Today</strong>
                        </div>

                    </div>

                </div>

            </section>
            <div className="save-note">
                <img
                    src="/images/savestic.png"
                    alt="Save Profile Pic"
                />
            </div>

        </div>

    );
}

export default Profile;
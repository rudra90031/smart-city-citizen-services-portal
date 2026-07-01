import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminNotifications.css";

function AdminNotifications() {

    const [recipient, setRecipient] = useState("all");

    const [email, setEmail] = useState("");

    const [subject, setSubject] = useState("");

    const [message, setMessage] = useState("");

    const recentNotifications = [

        {
            title: "Water Supply Maintenance",
            target: "All Users",
            time: "Today • 09:30 AM"
        },

        {
            title: "Holiday Notice",
            target: "All Users",
            time: "Yesterday"
        },

        {
            title: "Complaint Status Update",
            target: "rudratest3@gmail.com",
            time: "2 Days Ago"
        }

    ];

    const handleSend = () => {

        alert("Backend will send email here.");

    };

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="notification-container">

                <div className="notification-top">

                    <div>

                        <h1>Notifications</h1>

                        <p>
                            Send email notifications to citizens.
                        </p>

                    </div>

                    <div className="notification-count">

                        <h2>152</h2>

                        <span>Total Sent</span>

                    </div>

                </div>


                <div className="notification-card">

                    <h3>Compose Notification</h3>


                    <label>

                        Recipient

                    </label>

                    <select
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    >

                        <option value="all">

                            All Users

                        </option>

                        <option value="single">

                            Specific User

                        </option>

                    </select>


                    {
                        recipient === "single" && (

                            <>

                                <label>

                                    User Email

                                </label>

                                <input

                                    type="email"

                                    placeholder="Enter user's email"

                                    value={email}

                                    onChange={(e)=>setEmail(e.target.value)}

                                />

                            </>

                        )
                    }


                    <label>

                        Subject

                    </label>

                    <input

                        type="text"

                        placeholder="Notification Subject"

                        value={subject}

                        onChange={(e)=>setSubject(e.target.value)}

                    />


                    <label>

                        Message

                    </label>

                    <textarea

                        rows="7"

                        placeholder="Write your message..."

                        value={message}

                        onChange={(e)=>setMessage(e.target.value)}

                    ></textarea>


                    <button
                        className="send-btn"
                        onClick={handleSend}
                    >

                        Send Email

                    </button>

                </div>



                <div className="recent-card">

                    <h3>

                        Recent Notifications

                    </h3>

                    {

                        recentNotifications.map((item,index)=>(

                            <div
                                className="recent-item"
                                key={index}
                            >

                                <div>

                                    <h4>

                                        {item.title}

                                    </h4>

                                    <p>

                                        {item.target}

                                    </p>

                                </div>

                                <span>

                                    {item.time}

                                </span>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default AdminNotifications;
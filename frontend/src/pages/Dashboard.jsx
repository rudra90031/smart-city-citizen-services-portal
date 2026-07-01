import { useState, useEffect } from "react";
import { getComplaints } from "../services/authService";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user) {
      setUserName(user.name);
    }

    const fetchComplaints = async () => {
      try {

        const data = await getComplaints();

        console.log("DATA FROM API:", data);

        setComplaints(data);

      } catch (error) {
        console.log("ERROR:", error.response?.data);
      }
    };

    fetchComplaints();

  }, []);
  console.log("STATE:", complaints);
  return (
    <>
      <button
        tabIndex="-1"
        className="menu-btn"
        onClick={() => setShowMenu(true)}
      >
        MENU
      </button>
      {showMenu && (
        <>
          <div
            className="menu-overlay"
            onClick={() => setShowMenu(false)}
          ></div>

          <div className="menu-popup">

            <button
              className="close-btn"
              onClick={() => setShowMenu(false)}
            >
              ✕
            </button>

            <h2
              onClick={() => {
                document.getElementById("dashboard")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                setShowMenu(false);
              }}
            >
              Dashboard
            </h2>

            <h2
              onClick={() => {
                document.getElementById("complaints")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                setShowMenu(false);
              }}
            >
              Complaints
            </h2>

            <h2
              onClick={() => {
                document.getElementById("certificates")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                setShowMenu(false);
              }}
            >
              Certificates
            </h2>

            <h2
              onClick={() => {
                document.getElementById("bills")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                setShowMenu(false);
              }}
            >
              Bills
            </h2>

            <h2
              onClick={() => {
                document
                  .getElementById("profile")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });

                setShowMenu(false);
              }}
            >
              Profile
            </h2>

            <h2
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/");
              }}
            >
              Logout
            </h2>

          </div>
        </>
      )}
      <section className="dashboard-hero">



        <p className="welcome-text">
          WELCOME BACK, {userName.toUpperCase()}
        </p>

        <h1>Dashboard</h1>

        <p className="hero-subtitle">
          Track your requests and stay updated on
          important notifications.
        </p>
      </section>

      <section className="dashboard-content">

        <div className="stats-text">

          <div>
            <h2>{complaints.length}</h2>
            <p>Total Complaints</p>
          </div>

          <div>
            <h2>
              {
                complaints.filter(
                  (complaint) => complaint.status === "Pending"
                ).length
              }
            </h2>
            <p>Pending Complaints</p>
          </div>

          <div>
            <h2>18</h2>
            <p>Certificates Applied</p>
          </div>

          <div>
            <h2>12</h2>
            <p>Bills Paid</p>
          </div>

        </div>

        <div className="dashboard-grid">

          {/* Recent Complaints */}

          <div className="dashboard-card">

            <div className="card-header">
              <h3>Recent Complaints ({complaints.length})</h3>
            </div>

            <div className="complaints-list">

              {complaints.map((complaint) => (
                <div
                  className="complaint-item"
                  key={complaint._id}
                >
                  <div className="complaint-info">

                    <span>{complaint.title}</span>

                    <div className="complaint-id-row">

                      <small>
                        {complaint.complaintId}
                      </small>

                      <button
                        className="copy-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            complaint.complaintId
                          );
                          // alert("Complaint ID Copied");
                        }}
                      >
                        📋
                      </button>

                    </div>

                  </div>

                  <span className="status pending">
                    {complaint.status}
                  </span>
                </div>
              ))}

            </div>

          </div>

          {/* Recent Notifications */}

          <div className="dashboard-card">

            <div className="card-header">
              <h3>Recent Notifications</h3>
            </div>

            <div className="notifications-list">

              <div className="notification-item">
                Certificate Approved
              </div>

              <div className="notification-item">
                Water Bill Due in 3 Days
              </div>

              <div className="notification-item">
                Complaint #102 Status Updated
              </div>

              <div className="notification-item">
                Property Tax Reminder
              </div>

              <div className="notification-item">
                New City Announcement
              </div>

              <div className="notification-item">
                Complaint Resolved Successfully
              </div>

              <div className="notification-item">
                Electricity Bill Generated
              </div>

              <div className="notification-item">
                New Service Available
              </div>

            </div>

          </div>

        </div>

      </section>

    </>
  );
}

export default Dashboard;
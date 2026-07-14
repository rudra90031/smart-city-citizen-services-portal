import { useState, useEffect } from "react";
import { getComplaints } from "../services/authService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Dashboard() {
  // const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [bills, setBills] = useState([]);
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

    const fetchCertificates = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/certificates",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCertificates(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchCertificates();

    const fetchNotifications = async () => {

      try {

        const user = JSON.parse(localStorage.getItem("user"));

        const res = await axios.get(
          `http://localhost:5000/api/notifications/${user.id}`
        );

        setNotifications(res.data);

      }

      catch (err) {

        console.log(err);

      }

    };

    fetchNotifications();

    const fetchBills = async () => {

      try {

        const user = JSON.parse(localStorage.getItem("user"));

        const res = await axios.get(
          "http://localhost:5000/api/bills/my",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );


        console.log("Bills API Response:", res.data);

        setBills(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchBills();


  }, []);

  const markAsRead = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/notifications/${id}/read`
      );

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isRead: true }
            : item
        )
      );

    } catch (err) {

      console.log(err);

    }

  };
  console.log("STATE:", complaints);
  return (
    <>
      {/* <button
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
      )} */}



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
            <h2>{certificates.length}</h2>
            <p>Certificates Applied</p>
          </div>

          <div>
            <h2>
              {
                bills.filter(
                  (bill) => bill.isPaid
                ).length
              }
            </h2>
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

                  <div
                    className={`complaint-status ${complaint.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {complaint.status}
                  </div>
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

              {notifications.length === 0 ? (

                <div className="notification-empty">
                  No Notifications Yet
                </div>

              ) : (

                notifications.map((notification) => (

                  <div
                    key={notification._id}
                    className="notification-row"
                  >

                    <div className="notification-left">

                      {!notification.isRead && (
                        <span className="notification-dot"></span>
                      )}

                      <span className="notification-title">
                        {notification.title}
                      </span>

                    </div>

                    <span className="notification-time">

                      {new Date(notification.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}

                    </span>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </section>

    </>
  );
}

export default Dashboard;
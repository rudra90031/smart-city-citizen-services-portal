import { useState } from "react";
function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <button
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

            <h2>Dashboard</h2>
            <h2>Complaints</h2>
            <h2>Certificates</h2>
            <h2>Bills</h2>
            <h2>Profile</h2>
            <h2>Admin</h2>
            <h2>Logout</h2>

          </div>
        </>
      )}
      <section className="dashboard-hero">



        <p className="welcome-text">
          WELCOME BACK, RUDRA
        </p>

        <h1>Dashboard</h1>

        <p className="hero-subtitle">
          Track your requests and stay updated on
          important notifications.
        </p>
      </section>

      <section className="dashboard-content">

        <div className="stats-grid">

          <div className="stat-card">
            <h2>24</h2>
            <p>Total Complaints</p>
          </div>

          <div className="stat-card">
            <h2>7</h2>
            <p>Pending Complaints</p>
          </div>

          <div className="stat-card">
            <h2>18</h2>
            <p>Certificates Applied</p>
          </div>

          <div className="stat-card">
            <h2>12</h2>
            <p>Bills Paid</p>
          </div>

        </div>
        <div className="dashboard-grid">

          {/* Recent Complaints */}

          <div className="dashboard-card">

            <div className="card-header">
              <h3>Recent Complaints</h3>
            </div>

            <div className="complaints-list">

              <div className="complaint-item">
                <span>Street Light Not Working</span>
                <span className="status pending">Pending</span>
              </div>

              <div className="complaint-item">
                <span>Water Leakage</span>
                <span className="status resolved">Resolved</span>
              </div>

              <div className="complaint-item">
                <span>Garbage Collection Delay</span>
                <span className="status progress">In Progress</span>
              </div>

              <div className="complaint-item">
                <span>Road Damage</span>
                <span className="status review">Under Review</span>
              </div>

              <div className="complaint-item">
                <span>Sewage Issue</span>
                <span className="status pending">Pending</span>
              </div>

              <div className="complaint-item">
                <span>Pothole on Main Road</span>
                <span className="status resolved">Resolved</span>
              </div>

              <div className="complaint-item">
                <span>Broken Traffic Signal</span>
                <span className="status pending">Pending</span>
              </div>

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
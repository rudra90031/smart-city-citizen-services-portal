import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminComplaints.css";

function AdminComplaints() {
  const navigate = useNavigate();

  const complaints = [
    {
      id: "SC-2026-0001",
      citizen: "Rudra Verma",
      category: "Street Light",
      location: "Sector 15",
      status: "Pending",
      date: "18 Jun 2026",
    },
    {
      id: "SC-2026-0002",
      citizen: "Anam Sharma",
      category: "Garbage",
      location: "Sector 10",
      status: "In Progress",
      date: "18 Jun 2026",
    },
    {
      id: "SC-2026-0003",
      citizen: "Neha Singh",
      category: "Water Supply",
      location: "Sector 7",
      status: "Resolved",
      date: "17 Jun 2026",
    },
  ];

  return (
    <>
      <AdminSidebar />

      <div className="complaints-page">

        <div className="complaints-header">
          <div>
            <h1>Complaint Management</h1>
            <p>Manage and track all citizen complaints</p>
          </div>

          <button className="export-btn">
            Export CSV
          </button>
        </div>

        <div className="filters-box">

          <input
            type="text"
            placeholder="Search Complaint ID, Citizen, Location..."
          />

          <select>
            <option>All Categories</option>
          </select>

          <select>
            <option>All Status</option>
          </select>

          <select>
            <option>All Areas</option>
          </select>

          <input type="date" />

          <input type="date" />

          <select>
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>

        </div>

        <div className="quick-stats">
          <span>Showing 248 Complaints</span>
          <span>Pending: 43</span>
          <span>In Progress: 21</span>
          <span>Resolved: 184</span>
        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Citizen</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {complaints.map((item, index) => (

                <tr key={index}>

                  <td>{item.id}</td>

                  <td>{item.citizen}</td>

                  <td>{item.category}</td>

                  <td>{item.location}</td>

                  <td>
                    <span className={`status ${item.status.toLowerCase().replace(" ", "-")}`}>
                      {item.status}
                    </span>
                  </td>

                  <td>{item.date}</td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(`/admin/complaints/${item.id}`)
                      }
                    >
                      View
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default AdminComplaints;
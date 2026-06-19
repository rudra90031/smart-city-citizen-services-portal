import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminComplaints.css";

function AdminComplaints() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/complaints/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(res.data);

    } catch (error) {
      console.error(error);
    }
  };

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
          <span>Showing {complaints.length} Complaints</span>
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

                  <td>{item._id.slice(-6)}</td>

                  <td>{item.user?.name}</td>

                  <td>{item.category}</td>

                  <td>{item.location}</td>

                  <td>
                    <span className={`status ${item.status.toLowerCase().replace(" ", "-")}`}>
                      {item.status}
                    </span>
                  </td>

                  <td>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(`/admin/complaints/${item._id}`)
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
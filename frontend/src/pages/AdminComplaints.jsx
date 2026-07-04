import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminComplaints.css";

function AdminComplaints() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  useEffect(() => {
    fetchComplaints();
  }, []);

  let filteredComplaints = complaints.filter((item) => {

    const matchesSearch =
      item.complaintId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.area
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "" ||
      item.status === statusFilter;

    const matchesCategory =
      categoryFilter === "" ||
      item.category === categoryFilter;

    const complaintDate = new Date(item.createdAt);

    const matchesFromDate =
      !fromDate ||
      complaintDate >= new Date(fromDate);

    const matchesToDate =
      !toDate ||
      complaintDate <= new Date(toDate + "T23:59:59");

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesFromDate &&
      matchesToDate
    );

  });

  filteredComplaints.sort((a, b) => {

    if (sortOrder === "Newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    return new Date(a.createdAt) - new Date(b.createdAt);

  });

  const fetchComplaints = async () => {
    try {

      const token = localStorage.getItem("adminToken");

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
  const exportExcel = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.get(
        "http://localhost:5000/api/complaints/admin/export-excel",
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;

      const fileName = `complaints_${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`;

      link.download = fileName;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      alert("Excel export failed");
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

          <button
            className="export-btn"
            onClick={exportExcel}
          >
            Export Excel
          </button>
        </div>

        <div className="filters-box">

          <input
            type="text"
            placeholder="Search Complaint ID, Citizen, Location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />



          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Street Light">Street Light</option>
            <option value="Garbage Collection">Garbage Collection</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Road Damage">Road Damage</option>
          </select>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>

        </div>

        <div className="quick-stats">
          <span>Showing {complaints.length} Complaints</span>
          <span>
            Pending: {
              complaints.filter(
                c => c.status === "Pending"
              ).length
            }
          </span>

          <span>
            In Progress: {
              complaints.filter(
                c => c.status === "In Progress"
              ).length
            }
          </span>

          <span>
            Resolved: {
              complaints.filter(
                c => c.status === "Resolved"
              ).length
            }
          </span>
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

              {filteredComplaints.map((item, index) => (

                <tr key={index}>

                  <td>{item.complaintId}</td>

                  <td>{item.user?.name}</td>

                  <td>{item.category}</td>

                  <td>{item.location?.area || "N/A"}</td>

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
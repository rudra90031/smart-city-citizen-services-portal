import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminBills.css";

function AdminBills() {
    const [selectedBill, setSelectedBill] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [editMode, setEditMode] = useState(false);
    const billsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);



    const getBillStatus = (dueDate, isPaid) => {

        if (isPaid) {
            return "Paid";
        }

        const today = new Date();
        const due = new Date(dueDate);

        return today > due ? "Overdue" : "Pending";
    };

    const calculateLateFee = (dueDate, isPaid) => {

        if (isPaid) {
            return 0;
        }

        const today = new Date();
        const due = new Date(dueDate);

        const daysLate = Math.floor(
            (today - due) / (1000 * 60 * 60 * 24)
        );

        if (daysLate <= 0) {
            return 0;
        }

        return daysLate * 50;
    };

    const saveChanges = async () => {
        if (!selectedBill?._id) {
            console.log("No selected bill");
            return;
        }
        try {
            const token = localStorage.getItem("adminToken");

            const res = await axios.put(
                `http://localhost:5000/api/bills/${selectedBill._id}`,
                selectedBill,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedBills = billsData.map((bill) =>
                bill._id === selectedBill._id ? res.data : bill
            );

            setBillsData(updatedBills);
            setSelectedBill(res.data);
            setEditMode(false);

        } catch (err) {
            console.log(err);
        }
    };
    const [billsData, setBillsData] = useState([]);

    const fetchBills = async () => {
        try {
            const token = localStorage.getItem("adminToken");

            const res = await axios.get(
                "http://localhost:5000/api/bills",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setBillsData(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchBills();
    }, []);

    useEffect(() => {

        setCurrentPage(1);

    }, [searchTerm]);

    const [newBill, setNewBill] = useState({
        citizen: "",
        mobile: "",
        type: "",
        amount: "",
        dueDate: "",
        remarks: "",
        userId: "",
    });
    const filteredBills = billsData.filter((bill) =>
        (bill.citizen || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (bill.billId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (bill.mobile || "").includes(searchTerm)
    );
    const totalPages = Math.ceil(filteredBills.length / billsPerPage);

    const indexOfLastBill = currentPage * billsPerPage;
    const indexOfFirstBill = indexOfLastBill - billsPerPage;

    const currentBills = filteredBills.slice(
        indexOfFirstBill,
        indexOfLastBill
    );

    return (
        <div className="admin-bills-layout">

            <AdminSidebar />

            <main className="admin-bills-page">

                <div className="admin-bills-container">

                    <div className="admin-bills-header">

                        <div>
                            <h1>Utility Bills</h1>
                            <p>Manage all citizen utility bills</p>
                        </div>

                        <button
                            className="create-bill-btn"
                            onClick={() => {
                                setShowCreate(true);
                                setSelectedBill(null);
                            }}
                        >
                            Create Bill
                        </button>

                    </div>

                    <div className="admin-bills-stats">

                        <div className="stat-item">
                            <h2>482</h2>
                            <span>Total Bills</span>
                        </div>

                        <div className="stat-item">
                            <h2>71</h2>
                            <span>Pending</span>
                        </div>

                        <div className="stat-item">
                            <h2>23</h2>
                            <span>Overdue</span>
                        </div>

                        <div className="stat-item">
                            <h2>388</h2>
                            <span>Paid</span>
                        </div>

                    </div>

                    <div className="bill-search-row">
                        <input
                            type="text"
                            placeholder="Search Bill ID / Citizen Name / Mobile Number"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="bill-content">

                        <div className="bill-left">

                            <div className="bill-list">

                                {currentBills.map((bill) => (
                                    <div
                                        key={bill._id || bill.id}
                                        className="bill-row-admin"
                                        onClick={() => {
                                            setSelectedBill(bill);
                                            setShowCreate(false);
                                        }}
                                    >
                                        <div className="bill-col citizen-col">
                                            <h3>{bill.citizen}</h3>
                                            <span>{bill.billId || bill.id}</span>
                                        </div>

                                        <div className="bill-col">
                                            {bill.type}
                                        </div>

                                        <div className="bill-col">
                                            ₹{bill.amount + calculateLateFee(bill.dueDate, bill.isPaid)}
                                        </div>

                                        <div className="bill-col">
                                            {new Date(bill.dueDate).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </div>

                                        <div
                                            className={`bill-col status-${getBillStatus(
                                                bill.dueDate,
                                                bill.isPaid
                                            ).toLowerCase()}`}
                                        >
                                            {getBillStatus(bill.dueDate, bill.isPaid)}
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className="pagination">

                                {
                                    [...Array(totalPages)].map((_, index) => (

                                        <button
                                            key={index}
                                            className={
                                                currentPage === index + 1
                                                    ? "page-btn active-page"
                                                    : "page-btn"
                                            }

                                            onClick={() =>
                                                setCurrentPage(index + 1)
                                            }
                                        >

                                            {index + 1}

                                        </button>

                                    ))
                                }

                            </div>
                        </div>


                        <div className="bill-details">

                            {showCreate ? (
                                <>
                                    <h2>Utility Bills</h2>

                                    <div className="create-form">

                                        <input
                                            placeholder="Citizen Name"
                                            value={newBill.citizen}
                                            onChange={(e) =>
                                                setNewBill({ ...newBill, citizen: e.target.value })
                                            }
                                        />
                                        <input
                                            placeholder="Mobile Number"
                                            value={newBill.mobile}
                                            onChange={(e) =>
                                                setNewBill({ ...newBill, mobile: e.target.value })
                                            }
                                        />
                                        <input
                                            placeholder="Bill Type"
                                            value={newBill.type}
                                            onChange={(e) =>
                                                setNewBill({ ...newBill, type: e.target.value })
                                            }
                                        />
                                        <input
                                            type="number"
                                            placeholder="Amount"
                                            value={newBill.amount}
                                            onChange={(e) =>
                                                setNewBill({ ...newBill, amount: Number(e.target.value) })
                                            }
                                        />
                                        <input
                                            type="date"
                                            value={newBill.dueDate}
                                            onChange={(e) =>
                                                setNewBill({ ...newBill, dueDate: e.target.value })
                                            }
                                        />

                                        <textarea
                                            rows="5"
                                            value={newBill.remarks}
                                            onChange={(e) =>
                                                setNewBill({ ...newBill, remarks: e.target.value })
                                            }
                                        />

                                        <button
                                            onClick={async () => {
                                                try {
                                                    const token = localStorage.getItem("adminToken");

                                                    const res = await axios.post(
                                                        "http://localhost:5000/api/bills",
                                                        newBill,
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },
                                                        }
                                                    );

                                                    setBillsData([res.data, ...billsData]);

                                                    setNewBill({
                                                        citizen: "",
                                                        mobile: "",
                                                        type: "",
                                                        amount: "",
                                                        dueDate: "",
                                                        remarks: "",
                                                        userId: "",
                                                    });

                                                    setShowCreate(false);
                                                } catch (err) {
                                                    console.log(err);
                                                }
                                            }}
                                        >
                                            Create Bill
                                        </button>

                                    </div>
                                </>
                            ) : selectedBill ? (
                                <>
                                    {
                                        editMode ? (
                                            <input
                                                value={selectedBill.citizen}
                                                onChange={(e) =>
                                                    setSelectedBill({
                                                        ...selectedBill,
                                                        citizen: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            <h2>{selectedBill.citizen}</h2>
                                        )
                                    }

                                    <div className="detail-item">
                                        <span>Bill ID</span>
                                        <p>{selectedBill.id}</p>
                                    </div>

                                    <div className="detail-item">
                                        <span>Mobile Number</span>

                                        {editMode ? (
                                            <input
                                                value={selectedBill.mobile}
                                                onChange={(e) =>
                                                    setSelectedBill({
                                                        ...selectedBill,
                                                        mobile: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            <p>{selectedBill.mobile}</p>
                                        )}
                                    </div>

                                    <div className="detail-item">
                                        <span>Bill Type</span>

                                        {editMode ? (
                                            <select
                                                value={selectedBill.type}
                                                onChange={(e) =>
                                                    setSelectedBill({
                                                        ...selectedBill,
                                                        type: e.target.value,
                                                    })
                                                }
                                            >
                                                <option>Electricity</option>
                                                <option>Water</option>
                                                <option>Property Tax</option>
                                                <option>Sewer</option>
                                            </select>
                                        ) : (
                                            <p>{selectedBill.type}</p>
                                        )}
                                    </div>

                                    <div className="detail-item">
                                        <span>Amount</span>
                                        {editMode ? (
                                            <input
                                                type="number"
                                                value={selectedBill.amount}
                                                onChange={(e) =>
                                                    setSelectedBill({
                                                        ...selectedBill,
                                                        amount: Number(e.target.value),
                                                    })
                                                }
                                            />
                                        ) : (
                                            <p>₹{selectedBill.amount}</p>
                                        )}
                                    </div>

                                    <div className="detail-item">
                                        <span>Late Fee</span>
                                        <p>
                                            ₹{calculateLateFee(
                                                selectedBill.dueDate,
                                                selectedBill.isPaid
                                            )}
                                        </p>
                                    </div>

                                    <div className="detail-item">
                                        <span>Total Payable</span>
                                        <p>
                                            ₹{
                                                selectedBill.amount +
                                                calculateLateFee(
                                                    selectedBill.dueDate,
                                                    selectedBill.isPaid
                                                )
                                            }
                                        </p>
                                    </div>

                                    <div className="detail-item">
                                        <span>Due Date</span>
                                        {editMode ? (
                                            <input
                                                type="date"
                                                value={selectedBill.dueDate}
                                                onChange={(e) =>
                                                    setSelectedBill({
                                                        ...selectedBill,
                                                        dueDate: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            <p>
                                                {new Date(selectedBill.dueDate).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        )}
                                    </div>

                                    <div className="detail-item">
                                        <span>Status</span>
                                        <p>{getBillStatus(
                                            selectedBill.dueDate,
                                            selectedBill.isPaid
                                        )}</p>
                                    </div>

                                    <div className="detail-item">
                                        <span>Remarks</span>
                                        {editMode ? (
                                            <textarea
                                                rows="3"
                                                value={selectedBill.remarks}
                                                onChange={(e) =>
                                                    setSelectedBill({
                                                        ...selectedBill,
                                                        remarks: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            <p>{selectedBill.remarks}</p>
                                        )}
                                    </div>

                                    <div className="detail-actions">
                                        {editMode ? (
                                            <button onClick={saveChanges}>
                                                Save Changes
                                            </button>
                                        ) : (
                                            <button onClick={() => setEditMode(true)}>
                                                Edit Bill
                                            </button>
                                        )}
                                        <button
                                            onClick={async () => {
                                                try {
                                                    const token = localStorage.getItem("adminToken");

                                                    const res = await axios.put(
                                                        `http://localhost:5000/api/bills/${selectedBill._id}`,
                                                        {
                                                            ...selectedBill,
                                                            isPaid: true,
                                                        },
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },
                                                        }
                                                    );

                                                    const updatedBills = billsData.map((bill) =>
                                                        bill._id === selectedBill._id ? res.data : bill
                                                    );

                                                    setBillsData(updatedBills);
                                                    setSelectedBill(res.data);

                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }}
                                        >
                                            Mark Paid
                                        </button>
                                        <button
                                            onClick={async () => {
                                                try {
                                                    const token = localStorage.getItem("adminToken");

                                                    await axios.delete(
                                                        `http://localhost:5000/api/bills/${selectedBill._id}`,
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },
                                                        }
                                                    );

                                                    setBillsData(
                                                        billsData.filter(
                                                            (bill) => bill._id !== selectedBill._id
                                                        )
                                                    );

                                                    setSelectedBill(null);

                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }}
                                        >
                                            Delete Bill
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2>Bills</h2>

                                    <p className="default-message">
                                        Select a bill from the left side to view details.
                                    </p>
                                </>
                            )}

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default AdminBills;
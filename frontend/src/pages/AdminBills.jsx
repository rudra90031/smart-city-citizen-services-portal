import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles/adminBills.css";

function AdminBills() {
    const [selectedBill, setSelectedBill] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [editMode, setEditMode] = useState(false);



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

    const saveChanges = () => {

        const updatedBill = {
            ...selectedBill,
            status: getBillStatus(
                selectedBill.dueDate,
                selectedBill.isPaid
            ),
        };

        const updatedBills = billsData.map((bill) =>
            bill.id === updatedBill.id
                ? updatedBill
                : bill
        );

        setBillsData(updatedBills);
        setSelectedBill(updatedBill);
        setEditMode(false);
    };
    const bills = [
        {
            id: "BL-001",
            citizen: "Rudra Pratap",
            mobile: "9876543210",
            type: "Electricity",
            amount: 1250,
            dueDate: "2026-07-15",
            isPaid: false,
            remarks: "Awaiting payment",
        },
        {
            id: "BL-002",
            citizen: "Aman Sharma",
            mobile: "9123456780",
            type: "Water",
            amount: 850,
            dueDate: "2026-06-15",
            isPaid: true,
            remarks: "Paid Online",
        },
        {
            id: "BL-003",
            citizen: "Rahul Singh",
            mobile: "9988776655",
            type: "Property Tax",
            amount: 3500,
            dueDate: "2026-06-01",
            isPaid: false,
            remarks: "Reminder Sent",
        },
    ];
    const [billsData, setBillsData] = useState(bills);
    const [newBill, setNewBill] = useState({
        citizen: "",
        mobile: "",
        type: "",
        amount: "",
        dueDate: "",
        remarks: "",
    });
    const filteredBills = bills.filter((bill) =>
        bill.citizen.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.mobile.includes(searchTerm)
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

                        <div className="bill-list">

                            {filteredBills.map((bill) => (
                                <div
                                    key={bill.id}
                                    className="bill-row-admin"
                                    onClick={() => {
                                        setSelectedBill(bill);
                                        setShowCreate(false);
                                    }}
                                >
                                    <div className="bill-col citizen-col">
                                        <h3>{bill.citizen}</h3>
                                        <span>{bill.id}</span>
                                    </div>

                                    <div className="bill-col">
                                        {bill.type}
                                    </div>

                                    <div className="bill-col">
                                        ₹{bill.amount + calculateLateFee(bill.dueDate, bill.isPaid)}
                                    </div>

                                    <div className="bill-col">
                                        {bill.dueDate}
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
                                            onClick={() => {
                                                const bill = {
                                                    id: `BL-${Date.now()}`,
                                                    ...newBill,
                                                    isPaid: false,
                                                };

                                                setBillsData([bill, ...billsData]);

                                                setNewBill({
                                                    citizen: "",
                                                    mobile: "",
                                                    type: "",
                                                    amount: "",
                                                    dueDate: "",
                                                    remarks: "",
                                                });

                                                setShowCreate(false);
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
                                            <p>{selectedBill.dueDate}</p>
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
                                            onClick={() => {

                                                const updatedBills = billsData.map((bill) =>
                                                    bill.id === selectedBill.id
                                                        ? {
                                                            ...bill,
                                                            isPaid: true,
                                                            status: "Paid",
                                                        }
                                                        : bill
                                                );

                                                setBillsData(updatedBills);

                                                setSelectedBill({
                                                    ...selectedBill,
                                                    isPaid: true,
                                                    status: "Paid",
                                                });

                                            }}
                                        >
                                            Mark Paid
                                        </button>
                                        <button
                                            onClick={() => {

                                                const updatedBills = billsData.filter(
                                                    (bill) => bill.id !== selectedBill.id
                                                );

                                                setBillsData(updatedBills);

                                                setSelectedBill(null);

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
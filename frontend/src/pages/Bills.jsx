import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/bills.css";
import AnimatedWave from "../components/AnimatedWave";

function Bills() {
    const getBillStatus = (dueDate, isPaid) => {
        if (isPaid) return "Paid";

        const today = new Date();
        const due = new Date(dueDate);

        return today > due ? "Overdue" : "Pending";
    };

    const calculateLateFee = (dueDate, isPaid) => {
        if (isPaid) return 0;

        const today = new Date();
        const due = new Date(dueDate);

        const daysLate = Math.floor(
            (today - due) / (1000 * 60 * 60 * 24)
        );

        if (daysLate <= 0) return 0;

        return daysLate * 50;
    };
    const [bills, setBills] = useState([]);
    const fetchBills = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            const res = await axios.get("http://localhost:5000/api/bills");

            console.log("Logged User:", user);
            console.log("Bills API:", res.data);
            res.data.forEach((bill) => {
                console.log("----------------");
                console.log("Bill user:", bill.user);
                console.log("Bill user._id:", bill.user?._id);
                console.log("Logged user:", user.id);
            });

            const myBills = res.data.filter(
                (bill) =>
                    bill.user === user.id ||
                    bill.user?._id === user.id
            );

            setBills(myBills);

        } catch (err) {
            console.log("ERROR:", err);
            console.log("Response:", err.response);
            console.log("Data:", err.response?.data);
        }
    };
    useEffect(() => {
        fetchBills();
    }, []);

    const payBill = async (billId) => {
        try {

            await axios.put(`http://localhost:5000/api/bills/${billId}/pay`);

            fetchBills();

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="bills-wave-section">

            <AnimatedWave />

            <div className="bills-page">

                <div className="bills-header">
                    <h1>Utility Bills</h1>
                    <p>Manage and pay your city utility bills</p>
                </div>

                <div className="bills-container">
                    {bills.map((bill) => (
                        <div className="bill-row" key={bill.id}>
                            <div className="bill-left">
                                <h2>{bill.type}</h2>

                                <p>
                                    Amount: ₹
                                    {bill.amount + calculateLateFee(bill.dueDate, bill.isPaid)}
                                </p>
                                <p>
                                    Due Date: {new Date(bill.dueDate).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>

                            <div className="bill-right">
                                {bill.isPaid ? (
                                    <button className="paid-btn">
                                        Paid ✓
                                    </button>
                                ) : (
                                    <span
                                        className={`status-text ${bill.isPaid ? "paid-text" : "pending-text"
                                            }`}
                                    >
                                        {getBillStatus(bill.dueDate, bill.isPaid)}
                                    </span>
                                )}

                                {!bill.isPaid && (
                                    <>
                                        <button className="details-link">
                                            Details →
                                        </button>

                                        <button
                                            className="pay-btn"
                                            onClick={() => payBill(bill._id)}
                                        >
                                            Pay Bill
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <section className="profile-section">

                <div className="profile-header">

                    <div className="profile-avatar">
                        RP
                    </div>

                    <div>

                        <h2>Rudra Pratap Singh</h2>

                        <p>rudra@gmail.com</p>

                    </div>

                </div>

                <div className="profile-grid">

                    <div className="profile-card">

                        <h3>Personal Details</h3>

                        <label>Full Name</label>
                        <input type="text" value="Rudra Pratap Singh" />

                        <label>Email</label>
                        <input type="email" value="rudra@gmail.com" />

                        <label>Mobile Number</label>
                        <input type="text" value="+91 9876543210" />

                        <button className="save-btn">
                            Save Changes
                        </button>

                    </div>

                    <div className="profile-card">

                        <h3>Change Password</h3>

                        <label>Current Password</label>
                        <input type="password" />

                        <label>New Password</label>
                        <input type="password" />

                        <label>Confirm Password</label>
                        <input type="password" />

                        <button className="save-btn">
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

        </section>
    );
}

export default Bills;
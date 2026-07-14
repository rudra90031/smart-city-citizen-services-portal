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

            const res = await axios.get("http://localhost:5000/api/bills/my", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

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

            await axios.put(
                `http://localhost:5000/api/bills/${billId}/pay`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            fetchBills();

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section id="bills" className="bills-wave-section">

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

        </section>
    );
}

export default Bills;
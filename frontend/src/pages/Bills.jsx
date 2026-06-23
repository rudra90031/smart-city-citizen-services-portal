import React from "react";
import "../assets/styles/bills.css";
import AnimatedWave from "../components/AnimatedWave";

function Bills() {
    const bills = [
        {
            id: 1,
            type: "Electricity Bill",
            amount: 1250,
            dueDate: "15 Jul 2026",
            status: "Pending",
        },
        {
            id: 2,
            type: "Water Bill",
            amount: 450,
            dueDate: "10 Jul 2026",
            status: "Paid",
        },
        {
            id: 3,
            type: "Property Tax",
            amount: 2500,
            dueDate: "01 Jul 2026",
            status: "Overdue",
        },
        {
            id: 4,
            type: "Sewerage Bill",
            amount: 700,
            dueDate: "20 Jul 2026",
            status: "Pending",
        },
    ];

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

                                <p>Amount: ₹{bill.amount}</p>
                                <p>Due Date: {bill.dueDate}</p>
                            </div>

                            <div className="bill-right">
                                {bill.status === "Paid" ? (
                                    <button className="paid-btn">
                                        Paid ✓
                                    </button>
                                ) : (
                                    <span className={`status-text ${bill.status.toLowerCase()}-text`}>
                                        {bill.status}
                                    </span>
                                )}

                                {bill.status !== "Paid" && (
                                    <>
                                        <button className="details-link">
                                            Details →
                                        </button>

                                        <button className="pay-btn">
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
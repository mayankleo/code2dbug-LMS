import Payment from "../../models/payment.js";
import Enrollment from "../../models/enrollment.js";

export const seedPayments = async () => {
    const enrollments = await Enrollment.find({
        paymentStatus: { $nin: ["UNPAID"] },
    });

    if (enrollments.length === 0) {
        console.log("   ⚠ No paid enrollments found, skipping payments");
        return;
    }

    let paymentCount = 0;

    for (const enrollment of enrollments) {
        // Full payment for FULLY_PAID
        if (enrollment.paymentStatus === "FULLY_PAID") {
            const payment = await Payment.create({
                accountHolderName: "Rahul Sharma",
                bankName: "State Bank of India",
                ifscCode: "SBIN0001234",
                accountNumber: "12345678901",
                transactionId: `TXN${Date.now()}001`,
                amount: enrollment.courseAmount,
                currency: "INR",
            });

            await Enrollment.findByIdAndUpdate(enrollment._id, {
                fullPaymentDetails: payment._id,
            });

            paymentCount++;
        }

        // Partial payment for PARTIAL_PAID
        if (enrollment.paymentStatus === "PARTIAL_PAID") {
            const payment = await Payment.create({
                accountHolderName: "Priya Patel",
                bankName: "HDFC Bank",
                ifscCode: "HDFC0001234",
                accountNumber: "09876543210",
                transactionId: `TXN${Date.now()}002`,
                amount: enrollment.amountPaid,
                currency: "INR",
            });

            await Enrollment.findByIdAndUpdate(enrollment._id, {
                partialPaymentDetails: payment._id,
            });

            paymentCount++;
        }
    }

    console.log(`   ✓ Created ${paymentCount} payments`);
};

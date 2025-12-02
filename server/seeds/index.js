import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";

// Import all models first to register schemas
import {
    Student,
    Admin,
    Course,
    Enrollment,
    Payment,
    Submission,
    Referral,
    Leaderboard,
    Certificate,
    Analytics,
} from "../models/index.js";

// Import all seed functions
import { seedAdmins } from "./data/admin.seed.js";
import { seedStudents } from "./data/students.seed.js";
import { seedCourses } from "./data/courses.seed.js";
import { seedEnrollments } from "./data/enrollments.seed.js";
import { seedReferrals } from "./data/referrals.seed.js";
import { seedPayments } from "./data/payments.seed.js";
import { seedSubmissions } from "./data/submissions.seed.js";
import { seedLeaderboard } from "./data/leaderboard.seed.js";
import { seedCertificates } from "./data/certificates.seed.js";
import { seedAnalytics } from "./data/analytics.seed.js";

dotenv.config();

const seedDatabase = async () => {
    try {
        // Connect to database
        await connectDB();
        console.log("🔗 Connected to MongoDB\n");

        // Always clear database for fresh seed
        console.log("🗑️  Clearing existing data...");
        await mongoose.connection.dropDatabase();
        console.log("✅ Database cleared\n");

        console.log("🌱 Starting database seeding (minimal data)...\n");

        // Seed in correct order (respecting dependencies)

        console.log("👤 Step 1: Seeding Admin...");
        await seedAdmins();
        console.log("");

        console.log("🎓 Step 2: Seeding Students...");
        await seedStudents();
        console.log("");

        console.log("📚 Step 3: Seeding Course...");
        await seedCourses();
        console.log("");

        console.log("🔗 Step 4: Seeding Referrals...");
        await seedReferrals();
        console.log("");

        console.log("📝 Step 5: Seeding Enrollments...");
        await seedEnrollments();
        console.log("");

        console.log("💳 Step 6: Seeding Payments...");
        await seedPayments();
        console.log("");

        console.log("📤 Step 7: Seeding Submissions...");
        await seedSubmissions();
        console.log("");

        console.log("🏆 Step 8: Seeding Leaderboard...");
        await seedLeaderboard();
        console.log("");

        console.log("🎓 Step 9: Seeding Certificates...");
        await seedCertificates();
        console.log("");

        console.log("📊 Step 10: Seeding Analytics...");
        await seedAnalytics();
        console.log("");

        console.log("✅ Database seeded successfully! 🎉\n");
        console.log("═══════════════════════════════════════════════════════");
        console.log("📊 SEEDING SUMMARY (Minimal Data)");
        console.log("═══════════════════════════════════════════════════════");

        // Get final counts using imported models
        const counts = {
            admins: await Admin.countDocuments(),
            students: await Student.countDocuments(),
            courses: await Course.countDocuments(),
            enrollments: await Enrollment.countDocuments(),
            payments: await Payment.countDocuments(),
            submissions: await Submission.countDocuments(),
            referrals: await Referral.countDocuments(),
            leaderboard: await Leaderboard.countDocuments(),
            certificates: await Certificate.countDocuments(),
            analytics: await Analytics.countDocuments(),
        };

        console.log(
            `✓ Admins:       ${counts.admins.toString().padStart(4)} record`
        );
        console.log(
            `✓ Students:     ${counts.students.toString().padStart(4)} records`
        );
        console.log(
            `✓ Courses:      ${counts.courses.toString().padStart(4)} record`
        );
        console.log(
            `✓ Enrollments:  ${counts.enrollments.toString().padStart(4)} records`
        );
        console.log(
            `✓ Payments:     ${counts.payments.toString().padStart(4)} records`
        );
        console.log(
            `✓ Submissions:  ${counts.submissions.toString().padStart(4)} records`
        );
        console.log(
            `✓ Referrals:    ${counts.referrals.toString().padStart(4)} records`
        );
        console.log(
            `✓ Leaderboard:  ${counts.leaderboard.toString().padStart(4)} records`
        );
        console.log(
            `✓ Certificates: ${counts.certificates.toString().padStart(4)} records`
        );
        console.log(
            `✓ Analytics:    ${counts.analytics.toString().padStart(4)} record`
        );
        console.log(
            "═══════════════════════════════════════════════════════\n"
        );

        console.log("🎯 Fresh LMS ready with 0 progress!");
        console.log("💡 Test credentials:");
        console.log("   Admin: admin@code2dbug.com / Admin@123");
        console.log("   LMS: LMS001, LMS002 (enrolled) / Lms@123");
        console.log("   LMS: LMS003 (not enrolled) / Lms@123\n");

        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error.message);
        console.error(error);
        process.exit(1);
    }
};

seedDatabase();

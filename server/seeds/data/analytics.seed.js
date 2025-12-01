import Analytics from "../../models/analytics.js";
import Student from "../../models/student.js";
import Enrollment from "../../models/enrollment.js";
import Course from "../../models/course.js";

export const seedAnalytics = async () => {
    const totalStudents = await Student.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();
    const course = await Course.findOne({});

    // Calculate revenue from paid enrollments
    const paidEnrollments = await Enrollment.find({
        paymentStatus: { $in: ["PARTIAL_PAID", "FULLY_PAID"] },
    });
    const revenue = paidEnrollments.reduce(
        (sum, e) => sum + (e.amountPaid || 0),
        0
    );

    // Create analytics for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const analyticsEntry = {
        date: today,
        totalStudents,
        totalEnrollments,
        revenue,
        coursePopularity: course
            ? [
                  {
                      courseId: course._id,
                      title: course.title,
                      enrollments: totalEnrollments,
                  },
              ]
            : [],
        activeUsersToday: 0,
    };

    await Analytics.create(analyticsEntry);
    console.log("   ✓ Created 1 analytics record (today)");
    console.log(
        `   📊 Students: ${totalStudents}, Enrollments: ${totalEnrollments}, Revenue: ₹${revenue}`
    );
};

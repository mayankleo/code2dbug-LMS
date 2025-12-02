import Enrollment from "../../models/enrollment.js";
import Student from "../../models/student.js";
import Course from "../../models/course.js";

export const seedEnrollments = async () => {
    const students = await Student.find({});
    const course = await Course.findOne({});

    if (!course) {
        console.log("   ⚠ No course found, skipping enrollments");
        return;
    }

    // Enroll first 2 students in the course with different payment statuses
    const enrollments = [
        {
            student: students[0]._id,
            course: course._id,
            paymentStatus: "FULLY_PAID",
            courseAmount: course.price,
            amountPaid: course.price,
            amountRemaining: 0,
            enrollmentDate: new Date(),
            completedQuizzes: [],
            completedTasks: [],
            completedModules: [],
            progressPercentage: 0,
            isCompleted: false,
        },
        {
            student: students[1]._id,
            course: course._id,
            paymentStatus: "PARTIAL_PAID",
            courseAmount: course.price,
            amountPaid: Math.floor(course.price / 2),
            amountRemaining: Math.ceil(course.price / 2),
            enrollmentDate: new Date(),
            completedQuizzes: [],
            completedTasks: [],
            completedModules: [],
            progressPercentage: 0,
            isCompleted: false,
        },
    ];

    await Enrollment.insertMany(enrollments);

    // Update student courses array and account status
    await Student.findByIdAndUpdate(students[0]._id, {
        $push: { courses: course._id },
        accountStatus: "verified",
    });
    await Student.findByIdAndUpdate(students[1]._id, {
        $push: { courses: course._id },
        accountStatus: "verified",
    });

    console.log(`   ✓ Created ${enrollments.length} enrollments`);
    console.log("   📝 Student 1 (LMS001): FULLY_PAID");
    console.log("   📝 Student 2 (LMS002): PARTIAL_PAID");
};

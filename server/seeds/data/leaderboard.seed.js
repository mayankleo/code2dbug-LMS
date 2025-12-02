import Leaderboard from "../../models/leaderboard.js";
import Student from "../../models/student.js";
import Course from "../../models/course.js";

export const seedLeaderboard = async () => {
    const students = await Student.find({});
    const course = await Course.findOne({});

    const leaderboardEntries = [];

    // Create global leaderboard entries for all students (0 XP - fresh start)
    for (let i = 0; i < students.length; i++) {
        leaderboardEntries.push({
            student: students[i]._id,
            xp: 0,
            hoursLearned: 0,
            quizzesCompleted: 0,
            assignmentsCompleted: 0,
            rank: i + 1,
            type: "global",
            period: "alltime",
        });
    }

    // Create course leaderboard entries for enrolled students (first 2)
    if (course) {
        for (let i = 0; i < 2 && i < students.length; i++) {
            leaderboardEntries.push({
                student: students[i]._id,
                course: course._id,
                xp: 0,
                hoursLearned: 0,
                quizzesCompleted: 0,
                assignmentsCompleted: 0,
                rank: i + 1,
                type: "course",
                period: "alltime",
            });
        }
    }

    if (leaderboardEntries.length > 0) {
        await Leaderboard.insertMany(leaderboardEntries);
    }

    console.log(
        `   ✓ Created ${leaderboardEntries.length} leaderboard entries`
    );
};

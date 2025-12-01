import Course from "../../models/course.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seedCourses = async () => {
    // Load Flutter Mobile App course from JSON
    const flutterCoursePath = path.join(
        __dirname,
        "courses",
        "FlutterMobileApp.json"
    );
    const flutterCourse = JSON.parse(
        fs.readFileSync(flutterCoursePath, "utf8")
    );

    // Process the course to match the model structure
    const processedCourse = {
        title: flutterCourse.title,
        slug: flutterCourse.slug,
        description: flutterCourse.description,
        thumbnail: flutterCourse.thumbnail,
        stream: flutterCourse.stream,
        level: flutterCourse.level,
        price: flutterCourse.price,
        totalDuration: flutterCourse.totalDuration,
        isPublished: flutterCourse.isPublished,
        tags: flutterCourse.tags,
        modules: flutterCourse.modules.map((module, index) => ({
            title: module.title,
            maxTimelineInDays: module.maxTimelineInDays || 4,
            description: module.description,
            textLinks: module.textLinks || [],
            videoLinks: module.videoLinks || [],
            quizzes: (module.quizzes || []).map((quiz) => ({
                title: quiz.title,
                questions: (quiz.questions || []).map((q) => ({
                    questionText: q.questionText,
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                    isQuestionCompleted: false,
                })),
                isQuizCompleted: false,
            })),
            tasks: (module.tasks || []).map((task) => ({
                title: task.title,
                description: task.description,
                isTaskCompleted: false,
            })),
            order: module.order || index + 1,
            isModuleCompleted: false,
        })),
        capstoneProject: {
            title:
                flutterCourse.capstoneProject?.title ||
                flutterCourse.capstoneProjects?.title ||
                "Capstone Project",
            description:
                flutterCourse.capstoneProject?.description ||
                flutterCourse.capstoneProjects?.description ||
                "Complete the capstone project",
            isCapstoneCompleted: false,
        },
    };

    await Course.create(processedCourse);
    console.log("   ✓ Created 1 course (Flutter Mobile Development)");
    console.log(`   📚 Modules: ${processedCourse.modules.length}`);
};

const express = require("express");

//Models
const { getConnection, getQuery } = require("../../../../models");

const router = express.Router();

const generateCourseList = (course) => {
    let coursesList = [course.length];

    course.forEach((element, index) => {
        coursesList[index] = {
            courseId: element.course_id,
            courseAuthor: element.course_author,
            courseTitle: element.course_title,
            courseDescription: element.course_description,
            courseDate: {
                courseStartDate: element.course_start_date,
                courseEndDate: element.course_end_date,
            },
        };
    });

    return coursesList;
};

router.get("/", (req, res) => {
    getConnection(async (error, connection) => {
        if (!error && connection) {
            await getQuery(connection, {
                queryRequest: req.query,
                queryTargetTable: "courses",
                queryIsLimitless: true,
            })
                .then((result) => {
                    if (result.length === 0) {
                        res.status(200).json({
                            wasSuccessful: false,
                            description: "No courses found",
                        });
                    } else {
                        res.status(200).json({
                            wasSuccessful: true,
                            courses: generateCourseList(result),
                        });
                    }
                })
                .catch((error) => {
                    if (error.code === "ER_BAD_FIELD_ERROR") {
                        res.status(500).json({
                            wasSuccessful: false,
                            description: "Invalid query parameter",
                        });
                    } else {
                        res.status(500).json({
                            wasSuccessful: false,
                            description: "Server error, please try again",
                        });
                    }
                });

            connection.release();
        } else {
            res.status(500).json({
                wasSuccessful: false,
                description: "Server error, please try again",
            });
        }
    });
});

module.exports = router;

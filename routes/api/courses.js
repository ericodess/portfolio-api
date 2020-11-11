const e = require('express');
const express = require('express');

//Models
const getConnection = require('../../models/createPool');

const router = express.Router();

const generateCourseList = (course) => {
    let coursesList = [course.length];

    course.forEach((element,index) => {
        coursesList[index] = {
            course_id: element.course_id,
            course_author: element.course_author,
            course_title: element.course_title,
            course_description: element.course_description,
            course_date: {
                course_start_date: element.course_start_date,
                course_end_date: element.course_end_date
            }
        }
    });

    return coursesList;
};

router.get('/', (req, res) => {
    const connection = getConnection();

    connection.query("SELECT * FROM courses", (error,result) => {
        if(error){
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        }
        if(result.length === 0){
            res.status(401).json({
                success: false,
                description: 'No courses found'
            });
        }else{
            const coursesList = generateCourseList(result);

            res.status(200).json({
                success: true,
                courses: coursesList
            });
        }
    });
});

router.get('/:courseId', (req, res) => {
    const connection = getConnection();

    connection.query("SELECT * FROM courses WHERE course_id = ?", [
        req.params.courseId
    ], (error,result) => {
        if(error){
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        }
        if(result.length === 0){
            res.status(401).json({
                success: false,
                description: 'No course found'
            });
        }else{
            const coursesList = generateCourseList(result);

            res.status(200).json({
                success: true,
                courses: coursesList[0]
            });
        }
    });
});

router.get('/author/:courseAuthor', (req, res) => {
    const connection = getConnection();

    connection.query("SELECT * FROM courses WHERE course_author = ?", [
        req.params.courseAuthor
    ], (error,result) => {
        if(error){
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        }
        if(result.length === 0){
            res.status(401).json({
                success: false,
                description: 'No courses found'
            });
        }else{
            const courseList = generateCourseList(result);

            res.status(200).json({
                success: true,
                posts: courseList
            });
        }
    });
});

module.exports = router;
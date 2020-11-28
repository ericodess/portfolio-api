const express = require('express');

//Service
const generateQuery = require('../../../services/generateQuery');

//Models
const getConnection = require('../../../models/createPool');
const getQuery = require('../../../models/createQuery');

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
    const query = generateQuery({
        requestQueries: req.query,
        targetTable: 'courses'
    });

    getConnection(async (error,connection) => {
        await getQuery(connection,query.queryClauses, query.queryParameters)
        .then(result => {
            if(result.length === 0){
                res.status(200).json({
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
        })
        .catch(() => {
            res.status(500).json({
                success: false,
                description: 'Server error, please try again'
            });
        })

        connection.release();
    });
});

module.exports = router;
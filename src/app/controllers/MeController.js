const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {

    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            const isValidtype = ['asc', 'desc'].includes(req.query.type);//for security
            courseQuery = courseQuery.sort({
                //[req.query.column]: req.query.type //name: 'asc' => not secure
                [req.query.column]: isValidtype ? req.query.type : 'desc',
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses)
                })
            )
            .catch(next);
    }

    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => {
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses)
                })

            })
            .catch(next);
    }

    //[GET] /me/stored/news
    myBlog(req, res, next) {
        res.send("Coming soon...");
    }
}

module.exports = new MeController();

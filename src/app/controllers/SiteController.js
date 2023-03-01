const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    //[GET] /news
    // index(req, res) {
    //     Course.find({}, function (err, courses) {
    //         if (!err) res.json(courses);
    //         else res.status(400).json({ error: "ERROR!!!" });
    //     });
    // res.render('home');
    // }

    // index(req, res, next) {
    //     Course.find({}, function (err, courses) {
    //         if (!err) res.json(courses);
    //         else next(err);
    //     });
    // }

    //cach viet bang promises
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses)
                })
                // res.render('home', { courses });
                // courses = courses.map(course => course.toObject());
            })
            .catch(next);
    }


    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();

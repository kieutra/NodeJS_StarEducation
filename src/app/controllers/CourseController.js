const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {

  //[GET] /courses/:slug
  show(req, res, next) {
    //https://mongoosejs.com/docs/api.html#model_Model-findOne
    Course.findOne({ slug: req.params.slug })
      .then(course =>
        res.render('courses/show', { course: mongooseToObject(course) })
      )
      .catch(next);
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }

  //[POST]  /courses/store
  store(req, res, next) {
    // res.json(req.body);
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${formData.videoID}/sddefault.jpg`
    const course = new Course(formData);
    course.save().then(() => res.redirect('/me/stored/courses')).catch(next);
  }


  //[GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then(course => res.render('courses/edit', {
        course: mongooseToObject(course)
        //sau do sang ben views de dung bien course.
      }))
      .catch(next);
  }
  //[PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }
  //[DELETE] /courses/:id/force
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //SOFT DELETE
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  //[POST] /courses/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.actions) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds } }) //khi courseIds là mảng
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'restore':
        Course.restore({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'destroy':
        Course.deleteMany({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;

      default:
        res.json({ message: 'Action is invalid!' });
    }
  }
}

module.exports = new CourseController();

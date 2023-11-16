const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
  //[GET] /stored/courses
  storedCourses(req, res, next) {
    Course.find({})
      .then((courses) => res.render('me/stored-courses', { courses: multipleMongooseToObject(courses) }))
      .catch(next);
  }

  //[GET] /trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((courses) => res.render('me/trash-courses', { courses: multipleMongooseToObject(courses) }))
      .catch(next);
  }
}

module.exports = new MeController();

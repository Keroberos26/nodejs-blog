const Course = require('../models/Course');

class SiteController {
  // [GET] /
  async index(req, res) {
    // res.render('home');
    try {
      const course = await Course.find({});
      res.json(course);
    } catch {
      res.status(400).json({ err: 'ERROR!!!' });
    }
  }

  // [GET] /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();

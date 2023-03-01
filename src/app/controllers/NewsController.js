class NewsController {
    //[GET] /news
    index(req, res) {
        res.render('news');
    }

    //[GET] /news/:slug
    show(req, res) {
        res.send('NEWS DETAIL!!!');
    }

    showtest1(req, res) {
        res.send('NEWS TEST 1 !!!!');
    }

    showtest2(req, res) {
        res.send('NEWS TEST 2 !!!!');
    }
}

module.exports = new NewsController();

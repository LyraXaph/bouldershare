exports.homePage = (req, res) => {
    res.render('index', { title: "homePage"});
}

exports.addGym = (req, res) => {
    res.render('editGym', {title: 'Add Gym'});
}
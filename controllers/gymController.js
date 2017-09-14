const mongoose = require('mongoose');
const Gym = mongoose.model('Gym');


exports.homePage = (req, res) => {
    res.render('index', { title: "homePage"});
};

exports.addGym = (req, res) => {
    res.render('editGym', {title: 'Add Gym'});
};

exports.createGym = async (req, res) => {
    const gym = new Gym(req.body);
    await gym.save();
    res.redirect('/');
};
const mongoose = require('mongoose');
const Gym = mongoose.model('Gym');


exports.homePage = (req, res) => {
    res.render('index', { title: "homePage" });
};

exports.addGym = (req, res) => {
    res.render('editGym', {title: 'Add Gym'});
};

exports.createGym = async (req, res) => {
    const gym = await (new Gym(req.body)).save();
    req.flash('success', `Successfully Created ${gym.name}. Care to leave a review?`);
    res.redirect(`/gym/${gym.slug}`);
};

exports.getGyms = async (req, res) => {
    //1. query the database for the list of all stores
    const gyms = await Gym.find();
    res.render('gyms', {title: "gyms", gyms});
}
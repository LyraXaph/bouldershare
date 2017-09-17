const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = passport.authenticate('local', { 
    failureRedirect: '/login', 
    failureFlash: 'Failed login!', 
    successRedirect: '/', 
    sucessFlash: 'Login success!'
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out');
    res.redirect('/');
}

exports.isLoggedIn = (req, res, next) => {
    // first check if the user is authenticated
    if (req.isAuthenticated()) {
      next(); // carry on! They are logged in!
      return;
    }
    req.flash('error', 'Oops you must be logged in to do that!');
    res.redirect('/login');
  };

exports.forgot = async (req, res) => {
    // see if a user with that email exists
    const user = await User.findOne( { email: req.body.email});
    if (!user) {
        req.flash('error', 'No account with that email exists');
        return res.redirect('/login');
    }
    // set reset tokens and expiry on their account
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now + 3600000; // 1 hour from now
    await user.save();

    // send them an email with the token
    const resetURL = `http://${req.headers.host}.account/reset/${user.resetPasswordToken}`;
    req.flash('Success', `You have been emailed a password reset link ${resetURL}`);
    // redirect to login page
    res.redirect('/login');
}
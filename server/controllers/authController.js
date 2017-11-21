const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;

function jwtSignUser(user){
    const ONE_WEEK = 60 * 60 * 24 * 7;
    try {
    return jwt.sign(user, process.env.JWT_SECRET, 
                    {expiresIn: ONE_WEEK})
        }
    catch(err){
        return(err)
    }
}

exports.login = passport.authenticate('local', { 
    failureRedirect: '/login', 
    failureFlash: 'Failed login!', 
    successRedirect: '/', 
    sucessFlash: 'Login success!'
});

exports.login = (req, res) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(500).send({message: err}); }
        if (!user) { return res.status(403).send({message: 'The login information was incorrect'}); }
        req.logIn(user, function(err) {
          if (err) { return res.status(500).send({message: err}); }
          return res.send({message: `Login successful for ${user.name}`,
                           user: user.toJSON(), 
                           token: jwtSignUser(user.toJSON())});
        });
      })(req, res);
};

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
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // send them an email with the token
    const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
    mail.send({
        user,
        subject: 'Password Reset', 
        resetURL: resetURL, 
        filename: 'password-reset'
    }); 
    req.flash('success', `You have been emailed a password reset link ${resetURL}`);
    // redirect to login page
    res.redirect('/login');
}

exports.reset = async (req, res) => {
    const user = await User.findOne({
        // looking for a user with that token
        resetPasswordToken: req.params.token, 
        // that has not expired (gt = greater than)
        resetPasswordExpires: {$gt: Date.now()}
    });
    if (!user){
        req.flash('error', 'Password reset token invalid or expired!');
        return res.redirect('/login');
    }
    // if there is a user, show the reset password form
    res.render('reset', {title: 'Reset your password'});
};

exports.confirmedPasswords = (req, res, next) => {
    if (req.body.password === req.body['password-confirm']){
        next();
        return;
    }
    req.flash('error', 'Passwords do not match!');
    res.redirect('back');
};

exports.update = async (req, res) => {
    const user = await User.findOne({
        // looking for a user with that token
        resetPasswordToken: req.params.token, 
        // that has not expired (gt = greater than)
        resetPasswordExpires: {$gt: Date.now()}
    });
    if (!user){
        req.flash('error', 'Password reset token invalid or expired!');
        return res.redirect('/login');
    }

    const setPasssword = promisify(user.setPassword, user);
    await setPasssword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    const updatedUser = await user.save();
    // req.login is a method by passport
    await req.login(updatedUser);
    req.flash('success', '🤸 Nice! Your password has been reset. You are now logged in!');
    res.redirect('/');
};

exports.authenticate = async (req, res) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(500).send({message: err}); }
        if (!user) { return res.status(403).send({message: 'The login information was incorrect'}); }
        req.logIn(user, function(err) {
          if (err) { return res.status(500).send({message: err}); }
          return res.send({message: `Login successful for ${user.name}`,
                         //  user: user.toJSON(), 
                           token: jwtSignUser({
                                email: user.email, 
                                id: user._id
                                })
                        });
        });
      })(req, res);
}
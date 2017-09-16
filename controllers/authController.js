const passport = require('passport');

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


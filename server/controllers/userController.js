const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.loginForm = (req, res) => {
    res.render('login', { title: "Login" });
};

exports.registerForm = (req, res) => {
    res.render('register', { title: "Register" });
};

exports.validateRegister = (req, res, next) => {
    //req.sanitizeBody('name');

    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'That Email is not valid').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
    req.checkBody('confirmPassword', 'Confirmed Password cannot be blank').notEmpty();
    req.checkBody('confirmPassword', 'Your passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        //req.flash('error', errors.map(err => err.msg));
        // res.render('register', {title: 'Register', body: req.body, flashes: req.flash() });
        res.status(400).send(errors);
        //return; // stops the fn from running
    }
    next(); // there were no errors 
};

exports.register = async (req, res, next) => {
    console.log(req.body.email);
    const user = new User({ email: req.body.email, name: req.body.name });
    const register = promisify(User.register, User);
    try {
        await register(user, req.body.password);
    }
    catch (err) {
        res.status(400).send(err);
    }
    res.send({
        message: `Hello ${req.body.name}. Your user was registered.`, 
        user: user.toJSON()
    })
    //next();
};

exports.account = (req, res) => {
    res.render('account', { title: 'Edit your account' });
}

exports.updateAccount = async (req, res) => {
    const updates = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query' }
    );
    req.flash('success', 'Updated the profile');
    res.redirect('back'); //back to the one they came from 
}

exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}


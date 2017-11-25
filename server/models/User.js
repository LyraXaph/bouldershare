const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mangodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String, 
        unique: true, 
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'] , 
        required: 'Please Supply an email address'
    }, 
    name: {
        type: String, 
        required: 'Please supply a name', 
        trim: true
    }, 
    resetPasswordToken: String, 
    resetPasswordExpires: Date, 
    // hearts is an array of ids related to the gym 
    hearts: [
        { type: mongoose.Schema.ObjectId, ref: 'Gym'}
    ]
});

userSchema.virtual('gravatar').get(function() {
    const hash = md5(this.email);
    return `https://gravatar.com/avatar/${hash}?s=200`;
})

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'}); // exposes a method called register (hashes the password etc)
userSchema.plugin(mangodbErrorHandler);

module.exports = mongoose.model('User', userSchema);

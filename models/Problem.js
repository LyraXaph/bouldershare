const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    description: {
        type: String, 
    }, 
    grade: {
        type: String, // ??
    },
    created: {
        type: Date, 
        dafault: Date.now
    }, 
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', 
        required: 'You must supply an author!'
    }, 
    gym: {
        type: mongoose.Schema.ObjectId,
        ref: 'Gym', 
        required: 'You must supply a gym!'
    } 
    
});

module.exports = mongoose.model('Problem', problemSchema);

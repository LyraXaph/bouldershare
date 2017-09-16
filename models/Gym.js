const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const gymSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Please enter a gym name."
    },
    slug: String,
    description : {
        type: String, 
        trim: true
    },
    tags : [String], 
    photo: String
});

//define indexes (index something as text)
gymSchema.index({
    name: 'text', 
    description: 'text'
})

gymSchema.pre('save', function(next){
    if(!this.isModified('name')){
        next(); // skip it
        return; // stops this function from running
    }
    this.slug = slug(this.name);
    next();
})

module.exports = mongoose.model('Gym', gymSchema);

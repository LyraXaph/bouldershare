const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const slug = require('slugs');

const problemSchema = new Schema({
    name: {
        type: String, 
        required: "Please enter a problem name."
    },
    slug: String,
    description: {
        type: String, 
    }, 
    grade: {
        type: String, // ??
        required: "Please enter a grade."
    },
    created: {
        type: Date, 
        dafault: Date.now
    }, 
    photo: String, 
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', 
        required: 'You must supply an author!'
    }, 
    gym: {
        type: mongoose.Schema.ObjectId,
        ref: 'gym', 
        dafault: '58c05fd08060197ca0b52d5a'
        //required: 'You must supply a gym!'
    } 
    
});

//define indexes (index something as text)
problemSchema.index({
    name: 'text',
    description: 'text',
    grade: 'text'
});


problemSchema.pre('save', async function(next){
    if(!this.isModified('name')){
        next(); // skip it
        return; // stops this function from running
    }
    this.slug = slug(this.name);
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    const problemsWithSlug = await this.constructor.find({ slug: slugRegEx});
    if (problemsWithSlug.length){
        this.slug = `${this.slug}-${problemsWithSlug.length + 1}`;
    }
    next();
});

 // find reviews where the problem.id property === reviews problem property
 problemSchema.virtual('reviews', {
    ref: 'Review', 
    localField: '_id', // which field on the problem model
    foreignField: 'problem' // which field on the review model 
});

module.exports = mongoose.model('Problem', problemSchema);

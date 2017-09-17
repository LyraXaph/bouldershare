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
    created: {
        type: Date, 
        dafault: Date.now
    }, 
    location: {
        type: {
            type: String, 
            default: 'Point'
        },
        coordinates: [{
            type: Number, 
            required: 'You must supply coordinates'
        }], 
        address: {
            type: String,
            required: 'You must supply an address'
        }
    },
    photo: String
});

//define indexes (index something as text)
gymSchema.index({
    name: 'text', 
    description: 'text'
})

gymSchema.pre('save', async function(next){
    if(!this.isModified('name')){
        next(); // skip it
        return; // stops this function from running
    }
    this.slug = slug(this.name);
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    const gymsWithSlug = await this.constructor.find({ slug: slugRegEx});
    if (gymsWithSlug.length){
        this.slug = `${this.slug}-${gymsWithSlug.length + 1}`;
    }
    next();
})

module.exports = mongoose.model('Gym', gymSchema);

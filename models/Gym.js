const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const searchPlugin = require('mongoose-search-plugin');

const gymSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Please enter a gym name."
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String],
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
    photo: String,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply an author'
    },
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });

//define indexes (index something as text)
gymSchema.index({
    name: 'text',
    description: 'text'
});

gymSchema.index({
    location: '2dsphere'
});

gymSchema.pre('save', async function (next) {
    if (!this.isModified('name')) {
        next(); // skip it
        return; // stops this function from running
    }
    this.slug = slug(this.name);
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    const gymsWithSlug = await this.constructor.find({ slug: slugRegEx });
    if (gymsWithSlug.length) {
        this.slug = `${this.slug}-${gymsWithSlug.length + 1}`;
    }
    next();
});

gymSchema.statics.getTopGyms = function () {
    return this.aggregate([
        // lookup Gyms and populate their reviews
        {
            $lookup: {
                from: 'reviews', localField: '_id',
                foreignField: 'gym', as: 'reviews'
            }
        },
        // filter for items that have 2 or more reviews
        { $match: { 'reviews.1': { $exists: true } } },
        //add the average reviews field
        {
            $addFields: {
                averageRating: { $avg: '$reviews.rating' }
            }
        },
        // sort it by our new field, highest reviews first
        { $sort: { averageRating: -1 } },
        // limit to at most 10 gyms
        { $limit: 10 }

    ]);
}

function autopopulate(next) {
    this.populate('reviews');
    next();
}

gymSchema.pre('find', autopopulate);
gymSchema.pre('findOne', autopopulate);

// find reviews where the gyms.id property === reviews gym property
gymSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id', // which field on the gym model
    foreignField: 'gym' // which field on the review model 
});

module.exports = mongoose.model('Gym', gymSchema);



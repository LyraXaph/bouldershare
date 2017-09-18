const mongoose = require('mongoose');
const Gym = mongoose.model('Gym');
const User = mongoose.model('User');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');


const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next){
        const isPhoto = file.mimetype.startsWith('image/');
        if(isPhoto) {
            next(null, true);
        } else {
            next( {message: 'That filetype isn\'t allowed'}, false);
        }
    }
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
    // check if there is no new file to resize
    if (!req.file){
        next(); // skip to the next middleware
        return;
    } 
    const extension = req.file.mimetype.split('/')[1];
    req.body.photo = `${uuid.v4()}.${extension}`; 
    // now we resize
const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`);
    next();
}

exports.homePage = (req, res) => {
    res.render('index', { title: "homePage" });
};

exports.addGym = (req, res) => {
    res.render('editGym', {title: 'Add Gym'});
};

exports.createGym = async (req, res) => {
    req.body.author = req.user._id;
    const gym = await (new Gym(req.body)).save();
    req.flash('success', `Successfully Created ${gym.name}. Care to leave a review?`);
    res.redirect(`/gym/${gym.slug}`);
};

exports.getGyms = async (req, res) => {
    //1. query the database for the list of all stores
    const gyms = await Gym.find();
    res.render('gyms', {title: "gyms", gyms});
};

exports.getGymBySlug = async (req, res, next) => {
    // populate the object from the object id (author)
    const gym = await Gym.findOne({slug : req.params.slug}).populate('author');
    if (!gym) return next();
    res.render('gym', {title: gym.name, gym});
}

exports.getHeartedGyms = async (req, res, next) => {
    const gyms = await Gym.find( {_id : { $in : req.user.hearts } });
    res.render('gyms', {title: 'Hearted Gyms', gyms});
}

const confirmOwner = (gym, user) => {
    if(!gym.author.equals(user.id)){
        console.log(`Author ${gym.author.name}`);
        console.log(`user ${user.name}`)
        throw Error('You must own a gym in order to edit it');
    }
}

exports.editGym = async (req, res) => {
    const gym = await Gym.findOne({_id : req.params.id});
    confirmOwner(gym, req.user);
    res.render('editGym', {title: `Edit ${gym.name}`, gym});
}

exports.updateGym = async (req, res) => {
    // set the location data to be a point
    req.body.location.type = 'Point';
    const gym = await Gym.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, // return the updated gym instead of the old one
        runValidators: true}
    ).exec();
    req.flash('success', `Successfully updated ${gym.name}`);
    res.redirect(`/gyms/${gym._id}/edit`);
}

exports.searchGyms = async (req,  res) => {
    const gyms = await Gym.
    // first find gyms that match
    find({
        $text: {
            $search: req.query.q,
        }
    }, {
        score: { $meta: 'textScore' }
    })
    // then sort them 
    .sort({
        score: { $meta: 'textScore' }
    })
    // limit to only 5 results
    .limit(5);
    res.json(gyms);
}

exports.heartGym = async (req, res) => {
    const hearts = req.user.hearts.map(obj => obj.toString());
    const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
    const user = await User.
    findByIdAndUpdate(req.user.id, 
        { [operator]: {hearts: req.params.id}},
        { new: true }
    ); 
    res.json(user);
}
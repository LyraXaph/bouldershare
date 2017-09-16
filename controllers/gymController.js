const mongoose = require('mongoose');
const Gym = mongoose.model('Gym');
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
    const gym = await (new Gym(req.body)).save();
    req.flash('success', `Successfully Created ${gym.name}. Care to leave a review?`);
    res.redirect(`/gym/${gym.slug}`);
};

exports.getGyms = async (req, res) => {
    //1. query the database for the list of all stores
    const gyms = await Gym.find();
    res.render('gyms', {title: "gyms", gyms});
};

exports.editGym = async (req, res) => {
    const gym = await Gym.findOne({_id : req.params.id});
    res.render('editGym', {title: `Edit ${gym.name}`, gym});
}

exports.updateGym = async (req, res) => {
    const gym = await Gym.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true, // return the updated gym instead of the old one
        runValidators: true
    }).exec();
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
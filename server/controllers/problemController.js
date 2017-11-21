const mongoose = require('mongoose');
const Problem = mongoose.model('Problem');
const User = mongoose.model('User');
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

exports.addProblem = async (req, res) => {
    const gyms = await Gym.find();
    res.render('editProblem', {title: 'Add Problem', gyms});
};

exports.createProblem = async (req, res) => {
    req.body.author = req.user._id;
    const problem = await (new Problem(req.body)).save();
    req.flash('success', `Successfully Created ${problem.name}. Care to leave a review?`);
    res.redirect(`/problem/${problem.slug}`);
};

exports.getProblems = async (req, res) => {
    let problems = null
    if (req.query.search) {
        let regex = new RegExp('.*' + req.query.search + '.*', 'gi');        
        problems = await Problem.
            // first find Problems that match
            find({
                "name": regex
            }, {
                score: { $meta: 'textScore' }
            })
            // then sort them 
            .sort({
                score: { $meta: 'textScore' }
            })
            // limit to only 5 results
            .limit(5);  
    } else {
    //1. query the database for the list of all stores
    problems = await Problem.find();
    }
    res.send(problems)
};

exports.getProblemBySlug = async (req, res, next) => {
    // populate the object from the object id (author)
    const problem = await Problem.findOne({slug : req.params.slug}).populate('author reviews');
    if (!Problem) return next();
    res.render('problem', {title: problem.name, problem});
}

exports.getHeartedProblems = async (req, res, next) => {
    const problems = await Problem.find( {_id : { $in : req.user.hearts } });
    res.render('problems', {title: 'Hearted Problems', problems});
}

const confirmOwner = (Problem, user) => {
    if(!Problem.author.equals(user.id)){
        console.log(`Author ${Problem.author.name}`);
        console.log(`user ${user.name}`)
        throw Error('You must own a Problem in order to edit it');
    }
}

exports.editProblem = async (req, res) => {
    const Problem = await Problem.findOne({_id : req.params.id});
    confirmOwner(Problem, req.user);
    res.render('editProblem', {title: `Edit ${Problem.name}`, Problem});
}

exports.updateProblem = async (req, res) => {
    const Problem = await Problem.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, // return the updated Problem instead of the old one
        runValidators: true}
    ).exec();
    req.flash('success', `Successfully updated ${Problem.name}`);
    res.redirect(`/problems/${Problem._id}/edit`);
}

exports.searchProblems = async (req,  res) => {
    const Problems = await Problem.
    // first find Problems that match
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
    res.json(Problems);
}

exports.heartProblem = async (req, res) => {
    const hearts = req.user.hearts.map(obj => obj.toString());
    const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
    const user = await User.
    findByIdAndUpdate(req.user.id, 
        { [operator]: {hearts: req.params.id}},
        { new: true }
    ); 
    res.json(user);
}
const express = require('express');
const router = express.Router();
const gymController = require('../controllers/gymController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const problemController = require('../controllers/problemController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', gymController.getGyms);
router.get('/gyms', catchErrors(gymController.getGyms));
router.get('/hearts', authController.isLoggedIn, catchErrors(gymController.getHeartedGyms));
router.get('/add', authController.isLoggedIn, gymController.addGym);
router.post('/add',
    gymController.upload,
    catchErrors(gymController.resize), 
    catchErrors(gymController.createGym));
router.post('/add/:id', 
    gymController.upload,
    catchErrors(gymController.resize), 
    catchErrors(gymController.updateGym));
router.get('/gyms/:id/edit', catchErrors(gymController.editGym));
router.get('/gym/:slug', catchErrors(gymController.getGymBySlug));

router.get('/problemAdd', authController.isLoggedIn, catchErrors(problemController.addProblem));
router.post('/problemAdd',
    problemController.upload,
    catchErrors(problemController.resize), 
    catchErrors(problemController.createProblem));
router.post('/problemAdd/:id', 
    gymController.upload,
    catchErrors(problemController.resize), 
    catchErrors(problemController.updatProblem));
router.get('/problem/:slug', catchErrors(problemController.getProblemBySlug));
router.get('/problems', catchErrors(problemController.getProblems));

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);
router.post('/register', userController.validateRegister,
                         userController.register, 
                         authController.login);
router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token', 
    authController.confirmedPasswords,
    catchErrors(authController.update));

router.post('/reviews/:id', authController.isLoggedIn, catchErrors(reviewController.addReview));

router.get('/top', gymController.getTopGyms);

router.get('/map', gymController.mapPage);

/*
API endpoints
*/
router.get('/api/search', catchErrors(gymController.searchGyms));

router.post('/api/gyms/:id/heart', catchErrors(gymController.heartGym));
router.get('/api/gyms/near', catchErrors(gymController.mapGyms));
module.exports = router;


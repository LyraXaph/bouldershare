const express = require('express');
const router = express.Router();
const gymController = require('../controllers/gymController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', gymController.getGyms);
router.get('/gyms', catchErrors(gymController.getGyms));
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


router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);
router.post('/register', userController.validateRegister,
                         userController.register, 
                         authController.login);
router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));

router.post('/account/forgot', catchErrors(authController.forgot))
/*
API endpoints
*/
router.get('/api/search', catchErrors(gymController.searchGyms));

module.exports = router;


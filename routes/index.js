const express = require('express');
const router = express.Router();
const gymController = require('../controllers/gymController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', gymController.homePage);
router.get('/gyms', catchErrors(gymController.getGyms));
router.get('/add', gymController.addGym);
router.post('/add', catchErrors(gymController.createGym));
router.post('/add/:id', catchErrors(gymController.updateGym));
router.get('/gyms/:id/edit', catchErrors(gymController.editGym));

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);
router.post('/register', userController.validateRegister,
                         userController.register, 
                         authController.login);

router.get('/logout', authController.logout);

/*
API endpoints
*/
router.get('/api/search', catchErrors(gymController.searchGyms));

module.exports = router;


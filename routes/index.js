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
router.get('/register', userController.registerForm);
router.post('/register', userController.validateRegister,
                         userController.register, 
                         authController.login);

module.exports = router;


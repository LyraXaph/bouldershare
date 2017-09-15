const express = require('express');
const router = express.Router();
const gymController = require('../controllers/gymController')
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', gymController.homePage);
router.get('/gyms', catchErrors(gymController.getGyms));
router.get('/add', gymController.addGym);
router.post('/add', catchErrors(gymController.createGym));

module.exports = router;

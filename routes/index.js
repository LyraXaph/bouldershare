const express = require('express');
const router = express.Router();
const gymController = require('../controllers/gymController')

router.get('/', gymController.homePage);
router.get('/add', gymController.addGym);

module.exports = router;

const express = require('express');
const apiRoutes = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const problemController = require('../controllers/problemController');
const jwt    = require('jsonwebtoken');
const { catchErrors } = require('../handlers/errorHandlers');

apiRoutes.post('/register', userController.validateRegister,
                            userController.register, 
                            authController.login);

apiRoutes.post('/authenticate', authController.authenticate);

apiRoutes.use(function(req, res, next) {
    
      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      // decode token
      if (token) {
        
        // verifies secret and checks exp
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) { 
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;    
            next();
          }
        });
    
      } else {
    
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    
      }
    });
    
// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!', userId : req.user._id });
});

apiRoutes.get('/users', userController.getUsers);

apiRoutes.post('/problems', problemController.upload,
    (problemController.resize),  
    (problemController.createProblem));
  
module.exports = apiRoutes;
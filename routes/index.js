var express = require('express');
var router = express.Router();

const homeController = require('../controllers/homeController');
const authController = require('../controllers/auth');
const { ensureAuth } = require('../middleware/auth');

router.get('/', homeController.index);

router.get('/feed', homeController.getFeed);

router.get('/post', homeController.msgForm);

router.post('/post', homeController.postMsg);

router.get('/join/:id', homeController.getClubForm);

router.put('/join/:id', homeController.postClubForm);

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

router.get('logout', homeController.logout);

module.exports = router;

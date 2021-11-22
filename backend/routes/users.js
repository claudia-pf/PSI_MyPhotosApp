var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

//USER
router.post('/user/register', user_controller.register);
router.post('/user/login', user_controller.login);
router.get('/user/:id/favorite', user_controller.favorite);

router.get('/user/:id/favorite/:photoId', user_controller.isFavoritePhoto);
router.post('/user/:id/favorite', user_controller.addFavoritePhoto);
router.delete('/user/:id/favorite/:photoId', user_controller.removeFavoritePhoto);

module.exports = router;

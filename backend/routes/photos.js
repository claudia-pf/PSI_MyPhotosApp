var express = require('express');
var router = express.Router();

var photo_controller = require('../controllers/photoController')

router.post('/photos/upload', photo_controller.upload);
//router.get('/photos/all', photo_controller.photo_list);
router.get('/user/:id/MyPhotos', photo_controller.user_photos);

router.get('/photos/popular', photo_controller.popular);

router.get('/photos/recent', photo_controller.recent);

router.get('/photos/:id', photo_controller.findById);

router.delete('/photos/:id', photo_controller.photo_delete);

router.post('/photos/:id/like', photo_controller.like);

router.post('/photos/:id/dislike', photo_controller.dislike);

module.exports = router;
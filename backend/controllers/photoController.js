var Photo = require('../models/photo');

exports.upload = (req, res) => {
    let photo = new Photo({
        name:req.body.name, 
        description:req.body.description, 
        photoB64:req.body.photoB64, 
        userId:req.body.userId,
        likes:req.body.likes,
        numberLikes: req.body.numberLikes
    }
       );

    photo.save((err, result) => {
      if (err) {
            res.json({status:"NOK"}); //falta mensagem
      }else{
          res.json({status:"OK"});
      }
    });
};


exports.recent = (req, res) => {
    Photo.find().sort({ _id: -1 }).limit(50).exec(function (err, recentes) {
        if (err) {
          return next(err);
        }
        res.send(recentes);
      });

    };

exports.user_photos = (req, res) => {
    Photo.find({"userId": req.params.id})
        .exec((err, my_photos) => {
            if (err) {
                res.json({
                    status:"NOK"
                });
            }else{
                res.json({
                    status:"OK",
                    message:my_photos
                });

            }
        });
    };

exports.findById = (req, res) => {
        Photo.find({"_id": req.params.id})
            .exec((err, photo) => {
                if (err) {
                    res.json({
                        status:"NOK"
                    });
                }else{
                    res.json({
                        status:"OK",
                        message:photo
                    });
    
                }
            });
        };

exports.photo_delete = function(req, res) {
    Photo.remove({_id: req.params.id}, function (err, photo) {
        if (err)
            res.send(err);    
        res.json({
            message: 'Photo deleted'
        });
    });
};

exports.like = (req, res) => {

    Photo.updateOne({_id: req.params.id}, {$push: {"likes": req.body.userId}, $inc: {"numberLikes": 1}}, function (err, result) {
        if (err) {
              res.json({status:"NOK"}); 
        }else{
            res.json({status:"OK"});
        }
      });
    };

exports.dislike = (req, res) => {

    Photo.updateOne({_id: req.params.id}, {$pull: {"likes": req.body.userId}, $inc: {"numberLikes": -1}} , function (err, result) {
        if (err) {
            res.json({status:"NOK"}); 
        }else{
            res.json({status:"OK"});
        }
    });
};

exports.popular = (req, res) => {
    Photo.find().sort({ numberLikes: -1, _id: -1 }).limit(50).exec(function (err, populares) {
        if (err) {
            res.json({
                status:"NOK"
            });
        }else{
            res.json({
                status:"OK",
                message:populares
            });

        }
    });

}
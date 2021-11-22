var User = require('../models/user');
var Photo = require('../models/photo');

exports.register = (req, res) => {

    //Init user with data from post body
    let user = new User({ nickname: req.body.nickname, password: req.body.password });

    //nickname validation
    if(!/^[a-zA-Z0-9]*$/.test(user.nickname)){
        res.json({ 
            status: "NOK", 
            message: "O nickname só pode ter letras e números!" 
        });
        return;
    }

    //Password validation
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,}/.test(user.password)) {
        res.json({ status: "NOK" });
        return;
    }

    //Save data to bd
    user.save((err, result) => {
        if (err) {
            //Error occured
            if (err && err.code === 11000) {
                res.json({
                    status: "NOK",
                    message: "Já existe um utilizador registado com este nickname!"
                });
            } else {
                res.json({ status: "NOK" });
            }
        } else {
            res.json({ status: "OK" });
        }
    });
};

exports.login = (req, res) => {
    User.find({"nickname": req.body.nickname })
        .exec((err, user) => {
            if (err) {
                res.json({
                    status:"NOK"
                });
            }else{
                if(user[0] && user[0].password === req.body.password){
                    res.json({
                        status:"OK",
                        message:user[0]._id
                    });
                }else{
                    res.json({
                        status:"NOK",
                        message:"Dados de login incorretos."
                    });
                }
            }
        });
};

exports.user_detail = function (req, res, next){
    User.findById(req.params.id).exec(function (err, user){
        if (err) {
            return next(err)
        }
        res.send(user);
    });
};

exports.favorite = (req, res) => {
    User.findById(req.params.id).exec((err, user)=>{
        if (err) {
            res.json({
                status:"NOK"
            });
            return;
        }else{
            res.json({
                status:"OK",
                message: user.favorite
            });
            return;
        }
        
    });
};


exports.isFavoritePhoto = (req, res) => {

    User.findById(req.params.id).exec((err, user)=>{
        if (err) {
            res.json({status:"NOK"}); 
        }else{
            if(user.favorite.length > 0){
                for(i = 0; i < user.favorite.length; i++){
                    if(user.favorite[i] === req.params.photoId){
                        res.json({status:"OK"});
                    return;
                    }
                }
            }  
         res.json({status:"NOK"});
        } 
    }); 
    return;
    }; 
    
    exports.addFavoritePhoto = (req, res) => {

        //User.updateOne({_id: req.params.id}, {$push: {"favorite": req.body.photo}}, function (err) {
        User.updateOne({_id: req.params.id}, {$push: {"favorite": req.body.photoId}}, function (err) {
            if (err) {
                  res.json({status:"NOK"}); 
            }else{
                res.json({status:"OK"});
            }
          });
          return;
        };

    exports.removeFavoritePhoto = (req, res) => {

        //User.updateOne({_id: req.params.id}, {$pull: {"favorite": {"_id":req.params.photoId}}}, function (err) {
        User.updateOne({_id: req.params.id}, {$pull: {"favorite": req.params.photoId}}, function (err) {
            if (err) {
                  res.json({status:"NOK"}); 
            }else{
                res.json({status:"OK"});
            }
          });
          return;
        };

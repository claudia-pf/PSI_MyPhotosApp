var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const {Photo} = require('../models/photo');

var UserSchema = new Schema(
  {
    nickname: {type: String, required: true, minlength: 3, unique:true},
    password: {type: String, required: true, minlength: 8},
    favorite: {type: [String]}
  }
);


//Export model
module.exports = mongoose.model('User', UserSchema);
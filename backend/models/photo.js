var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PhotoSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    description: {type: String, maxlength: 500},
    photoB64: {type: String, required: true},
    userId: {type: String, required: true},
    likes: [ {type: String} ],
    numberLikes: {type: Number}
  }
);


//Export model
module.exports = mongoose.model('Photo', PhotoSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var usersSchema = new Schema({
	name:String,
	password:String,
	email:String,
	createdTime:{type:Date, default: Date.now},
	commentaries:[{type:Schema.Types.ObjectId, ref:'commentaries'}]

});

var Users = mongoose.model('users',usersSchema);
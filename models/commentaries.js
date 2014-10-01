var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var commentariesSchema = new Schema({
	_creator:[{type:Number, ref:'Users'}],
	commentarie:String,
	createdTime:{type:Date, default: Date.now},
	stars:
	{
		createdTime:{type:Date, default: Date.now},
		creator:[{type:Number,ref:'Users'}]
	}

});

var Commentaries = mongoose.model('commentaries',commentariesSchema);
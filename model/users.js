var mongoose = require('mongoose');
var Schema = mongoose.Schema

const users = new Schema({
	email: String,
	password: String
})

var models = mongoose.model('User', users)

module.exports = models
var mongoose = require('mongoose');

// importando o plugin
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
	var schema = mongoose.Schema({
		nome: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		login: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		password: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: false,
		},
		inclusao: {
			type: Date,
			default: Date.now
		}
	});

	// associando plugin ao nosso esquema
	schema.plugin(findOrCreate);

	return mongoose.model('Usuario', schema);
};
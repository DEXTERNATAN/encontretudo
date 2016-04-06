var mongoose = require('mongoose');
module.exports = function() {
	var schema = mongoose.Schema({
		nome: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		categoria: {
			type: String,
			required: true
		},
		endereco: {
			type: String,
			required: false
		},
		telefone: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		observacao: {
			type: String
		},
		site: {
			type: String
		},
		cidade: {
			type: String
		},
		estado: {
			type: String
		},
		inclusao: {
			type: Date,
			default: Date.now
		}
	});

	return mongoose.model('Contato', schema);

};

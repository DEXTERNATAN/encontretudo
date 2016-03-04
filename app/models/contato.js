var mongoose = require('mongoose');
module.exports = function() {
	var schema = mongoose.Schema({
		nome: {
			type: String,
			required: true
		},
		endereco: {
			type: String,
			required: true
		},
		telefone: {
			type: Number,
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
		}
		,
		cidade: {
			type: String
		}
		,
		estado: {
			type: String
		}
	});

	return mongoose.model('Contato', schema);
	
};
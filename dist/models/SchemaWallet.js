'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var walletSchema = new _mongoose.Schema({
	address: {
		type: String
	},
	publicKey: {
		type: String
	},
	privateKey: {
		type: String
	}
});

exports.default = walletSchema;
//# sourceMappingURL=SchemaWallet.js.map
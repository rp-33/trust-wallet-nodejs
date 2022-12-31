'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bitcoreLib = require('bitcore-lib');

var _bitcoreLib2 = _interopRequireDefault(_bitcoreLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WalletBtc = function () {
	function WalletBtc() {
		_classCallCheck(this, WalletBtc);
	}

	_createClass(WalletBtc, [{
		key: 'create',
		value: function create() {

			var privateKey = new _bitcoreLib2.default.PrivateKey();

			var address = privateKey.toAddress();

			var walletBtc = {
				'address': address,
				'privateKey': privateKey
			};

			return walletBtc;
		}
	}, {
		key: 'getBalance',
		value: function getBalance(address) {}
	}, {
		key: 'getHistorial',
		value: function getHistorial(address) {}
	}, {
		key: 'transaction',
		value: function transaction(privateKey, myAddress, toAddress, amount) {

			var utxo = {
				"txId": "115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986",
				"outputIndex": 0,
				"address": myAddress,
				"script": "76a91447862fe165e6121af80d5dde1ecb478ed170565b88ac",
				"satoshis": 50000
			}; //obtener utxo desde la red

			var transaction = new _bitcoreLib2.default.Transaction().from(utxo).to(toAddress, 15000).sign(privateKey);

			console.log(transaction);
		}
	}]);

	return WalletBtc;
}();

exports.default = new WalletBtc();
//# sourceMappingURL=walletBtc.js.map
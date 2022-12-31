'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bitcoinjsLib = require('bitcoinjs-lib');

var litcoin = _interopRequireWildcard(_bitcoinjsLib);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WalletLtc = function () {
	function WalletLtc() {
		_classCallCheck(this, WalletLtc);
	}

	_createClass(WalletLtc, [{
		key: 'create',
		value: function create() {
			var LITECOIN = {
				messagePrefix: '\x19Litecoin Signed Message:\n',
				bech32: 'ltc',
				bip32: {
					public: 0x019da462,
					private: 0x019d9cfe
				},
				pubKeyHash: 0x30,
				scriptHash: 0x32,
				wif: 0xb0
			};

			var keyPair = litcoin.ECPair.makeRandom({ network: LITECOIN });
			var publicKey = keyPair.publicKey;

			var _litcoin$payments$p2p = litcoin.payments.p2pkh({
				pubkey: publicKey,
				network: LITECOIN
			}),
			    address = _litcoin$payments$p2p.address;

			var privateKey = keyPair.toWIF();

			var walletLtc = {
				'address': address,
				'privateKey': privateKey
			};

			return walletLtc;
		}
	}, {
		key: 'getBalance',
		value: function getBalance(address) {}
	}, {
		key: 'getHistorial',
		value: function getHistorial(address) {}
	}, {
		key: 'transaction',
		value: function transaction(privatekey, myAddress, toAddress, amount) {}
	}]);

	return WalletLtc;
}();

exports.default = new WalletLtc();
//# sourceMappingURL=walletLtc.js.map
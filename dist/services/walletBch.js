'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bitcoreLibCash = require('bitcore-lib-cash');

var _bitcoreLibCash2 = _interopRequireDefault(_bitcoreLibCash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WalletBch = function () {
	function WalletBch() {
		_classCallCheck(this, WalletBch);
	}

	_createClass(WalletBch, [{
		key: 'create',
		value: function create() {

			var privateKey = new _bitcoreLibCash2.default.PrivateKey();

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
		value: function transaction(privatekey, myAddress, toAddress, amount) {}
	}]);

	return WalletBch;
}();

exports.default = new WalletBch();
//# sourceMappingURL=walletBch.js.map
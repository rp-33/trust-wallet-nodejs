'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ethereumjsWallet = require('ethereumjs-wallet');

var _ethereumjsWallet2 = _interopRequireDefault(_ethereumjsWallet);

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _ethereumjsTx = require('ethereumjs-tx');

var _ethereumjsTx2 = _interopRequireDefault(_ethereumjsTx);

var _configuration = require('../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WalletEth = function () {
    function WalletEth() {
        _classCallCheck(this, WalletEth);

        this.web3js = new _web2.default(_configuration2.default.infura.provider);
    }

    _createClass(WalletEth, [{
        key: 'create',
        value: function create() {

            var ethWallet = _ethereumjsWallet2.default.generate();

            var walletEth = {
                'address': ethWallet.getAddressString(),
                'privateKey': ethWallet.getPrivateKeyString()
            };

            return walletEth;
        }
    }, {
        key: 'getBalance',
        value: function getBalance(address) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                try {

                    _this.web3js.eth.getBalance(address, function (err, balance) {
                        if (err) {
                            reject({
                                status: 400,
                                error: 'Su direccion no existe'
                            });
                        } else {
                            resolve({
                                status: 200,
                                balance: _this.web3js.utils.fromWei(balance, "ether")
                            });
                        }
                    });
                } catch (err) {
                    reject({
                        status: 500,
                        error: 'ha ocurrido un error'
                    });
                }
            });
        }
    }, {
        key: 'transaction',
        value: function transaction(privatekey, myAddress, toAddress, amount) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                try {
                    var addressKey = Buffer.from(privatekey.substring(2, 66), 'hex');
                    _this2.web3js.eth.getTransactionCount(myAddress).then(function (txCount) {

                        var rawTransaction = {
                            nonce: _this2.web3js.utils.toHex(txCount),
                            gasPrice: _this2.web3js.utils.toHex(_this2.web3js.utils.toWei("2", "gwei")),
                            gasLimit: _this2.web3js.utils.toHex(21000),
                            to: toAddress,
                            value: _this2.web3js.utils.toHex(_this2.web3js.utils.toWei(amount))

                            //creamos la transaccion
                        };var transactioneth = new _ethereumjsTx2.default(rawTransaction);
                        //firmando la transaccion
                        transactioneth.sign(addressKey);
                        //sending transacton via web3js module
                        _this2.web3js.eth.sendSignedTransaction('0x' + transactioneth.serialize().toString('hex')).on('transactionHash', function (hash) {
                            resolve({
                                status: 201,
                                hash: hash
                            });
                        }).on('error', function (err) {
                            console.log(err);
                            reject({
                                status: 500,
                                message: 'Error en la transferencia'
                            });
                        });
                    });
                } catch (err) {
                    reject({
                        status: 500,
                        error: 'ha ocurrido un error'
                    });
                }
            });
        }
    }, {
        key: 'getHistorial',
        value: async function getHistorial(address) {
            console.log('address', address);
            var block = await this.web3js.eth.getBlock(9930484);
            var number = block.number;
            var blockTransactions = block.transactions;

            if (block != null && blockTransactions != null) {
                var transactions = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = blockTransactions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var txHash = _step.value;

                        var tx = await this.web3js.eth.getTransaction(txHash);
                        if (address.toLowerCase() == tx.to.toLowerCase() || address.toLowerCase() == tx.from.toLowerCase()) {
                            console.log(tx);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }
    }]);

    return WalletEth;
}();

exports.default = new WalletEth();
//# sourceMappingURL=walletEth.js.map
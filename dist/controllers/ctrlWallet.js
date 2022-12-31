'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.transactionBtc = exports.createWalletLtc = exports.createWalletBch = exports.createWalletBtc = exports.getHistoricEth = exports.getBalanceEth = exports.transactionEth = exports.createWalletEth = undefined;

var _SchemaUser = require('../models/SchemaUser');

var _SchemaUser2 = _interopRequireDefault(_SchemaUser);

var _walletEth = require('../services/walletEth');

var _walletEth2 = _interopRequireDefault(_walletEth);

var _walletBtc = require('../services/walletBtc');

var _walletBtc2 = _interopRequireDefault(_walletBtc);

var _walletBch = require('../services/walletBch');

var _walletBch2 = _interopRequireDefault(_walletBch);

var _walletLtc = require('../services/walletLtc');

var _walletLtc2 = _interopRequireDefault(_walletLtc);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createWalletEth = exports.createWalletEth = async function createWalletEth(req, res) {
	try {
		var wallet = _walletEth2.default.create();
		var user = await _SchemaUser2.default.updateOne({ _id: req.user }, { $set: { walletEth: wallet } });
		if (user.n > 0 && user.ok > 0) return res.status(201).send({ message: 'cartera creada con exito' });
		res.status(400).send({ error: 'No se pudo crear su cartera' });
	} catch (err) {
		res.status(500).send({ error: 'Error en el servidor' });
	}
};

var transactionEth = exports.transactionEth = async function transactionEth(req, res) {
	try {
		var _req$body = req.body,
		    toAddress = _req$body.toAddress,
		    amount = _req$body.amount;

		var person = await _SchemaUser2.default.findOne({ _id: req.user }, { walletEth: true });
		var transaction = await _walletEth2.default.transaction(person.walletEth.privateKey, person.walletEth.address, toAddress, amount);
		if (transaction.status === 201) return res.status(transaction.status).send({
			hash: transaction.hash,
			amount: amount,
			fromAddress: person.walletEth.address,
			toAddress: toAddress,
			date: (0, _moment2.default)()
		});

		res.status(transaction.status).send({ error: transaction.error });
	} catch (err) {
		res.status(err.status).send({ error: err.message });
	}
};

var getBalanceEth = exports.getBalanceEth = async function getBalanceEth(req, res) {
	try {
		var person = await _SchemaUser2.default.findOne({ _id: req.user }, { walletEth: true });
		var wallet = await _walletEth2.default.getBalance(person.walletEth.address);
		if (wallet.status === 200) return res.status(wallet.status).send({ balance: wallet.balance });
		res.status(wallet.status).send({ error: wallet.error });
	} catch (err) {
		res.status(500).send({ error: 'Error en el servidor' });
	}
};

var getHistoricEth = exports.getHistoricEth = async function getHistoricEth(req, res) {
	try {
		var person = await _SchemaUser2.default.findOne({ _id: req.user }, { walletEth: true });
		var result = await _walletEth2.default.getHistorial(person.walletEth.address);
		//if(result.status===200) return res.status(result.status).send({historic:result.transactions});
		//res.status(result.status).send({error : result.error})
	} catch (err) {
		res.status(500).send({ error: 'Error en el servidor' });
	}
};

var createWalletBtc = exports.createWalletBtc = async function createWalletBtc(req, res) {
	try {
		var wallet = _walletBtc2.default.create();
		var user = await _SchemaUser2.default.updateOne({ _id: req.user }, { $set: { walletBtc: wallet } });
		if (user.n > 0 && user.ok > 0) return res.status(201).send({ message: 'cartera creada con exito' });
		res.status(400).send({ error: 'No se pudo crear su cartera' });
	} catch (err) {
		res.status(500).send({ error: err });
	}
};

var createWalletBch = exports.createWalletBch = async function createWalletBch(req, res) {
	try {
		var wallet = _walletBch2.default.create();
		console.log(wallet);
		var user = await _SchemaUser2.default.updateOne({ _id: req.user }, { $set: { walletBch: wallet } });
		if (user.n > 0 && user.ok > 0) return res.status(201).send({ message: 'cartera creada con exito' });
		res.status(400).send({ error: 'No se pudo crear su cartera' });
	} catch (err) {
		res.status(500).send({ error: err });
	}
};

var createWalletLtc = exports.createWalletLtc = async function createWalletLtc(req, res) {
	try {
		var wallet = _walletLtc2.default.create();
		var user = await _SchemaUser2.default.updateOne({ _id: req.user }, { $set: { walletLtc: wallet } });
		if (user.n > 0 && user.ok > 0) return res.status(201).send({ message: 'cartera creada con exito' });
		res.status(400).send({ error: 'No se pudo crear su cartera' });
	} catch (err) {
		res.status(500).send({ error: err });
	}
};

var transactionBtc = exports.transactionBtc = async function transactionBtc(req, res) {
	try {
		var _req$body2 = req.body,
		    toAddress = _req$body2.toAddress,
		    amount = _req$body2.amount;

		var person = await _SchemaUser2.default.findOne({ _id: req.user }, { walletBtc: true });
		var transaction = await _walletBtc2.default.transaction(person.walletBtc.privateKey, person.walletBtc.address, toAddress, amount);
	} catch (err) {
		console.log(err);
		res.status(500).send({ error: err });
	}
};
//# sourceMappingURL=ctrlWallet.js.map
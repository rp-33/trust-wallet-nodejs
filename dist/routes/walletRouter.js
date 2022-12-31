'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _middlewares = require('../middlewares');

var _ctrlWallet = require('../controllers/ctrlWallet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _expressPromiseRouter2.default)();

/* GET */

router.get('/balance/eth', _middlewares.auth, _ctrlWallet.getBalanceEth);

router.get('/historic/eth', _middlewares.auth, _ctrlWallet.getHistoricEth);

/* POST */

router.post('/transaction/eth', _middlewares.auth, _ctrlWallet.transactionEth);

router.post('/transaction/btc', _middlewares.auth, _ctrlWallet.transactionBtc);

/* PUT */

router.put('/create/walletEth', _middlewares.auth, _ctrlWallet.createWalletEth);

router.put('/create/walletBtc', _middlewares.auth, _ctrlWallet.createWalletBtc);

router.put('/create/walletBch', _middlewares.auth, _ctrlWallet.createWalletBch);

router.put('/create/walletLtc', _middlewares.auth, _ctrlWallet.createWalletLtc);

exports.default = router;
//# sourceMappingURL=walletRouter.js.map
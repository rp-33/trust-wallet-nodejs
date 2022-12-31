'use strict';

import Router from "express-promise-router";
import {auth} from '../middlewares';
import {
	createWalletEth,
	transactionEth,
	getBalanceEth,
	getBalanceUsdtEth,
	createWalletBtc,
	createWalletUsdtEth,
	getBalanceBtc,
	createWalletBch,
	getBalanceBch,
	createWalletLtc,
	getBalanceLtc,
	transactionBtc,
	transactionBch,
	transactionLtc,
	transactionUsdtEth,
	getHistoryLtc,
	getTxDetailLtc,
	getHistoryBtc,
	getTxDetailBtc,
	getHistoryBch,
	getTxDetailBch,
	getHistoryEth,
	getHistoryUsdtEth,
	createWalletDash,
	getBalanceDash,
	getHistoryDash,
	getTxDetailDash,
	transactionDash
} from '../controllers/ctrlWallet';

const router = Router();

/* GET */

router.get('/balance/eth',auth,getBalanceEth);

router.get('/balance/btc',auth,getBalanceBtc);

router.get('/balance/bch',auth,getBalanceBch);

router.get('/balance/ltc',auth,getBalanceLtc);

router.get('/balance/usdtEth',auth,getBalanceUsdtEth);

router.get('/balance/dash',auth,getBalanceDash);

router.get('/history/ltc',auth,getHistoryLtc);

router.get('/detailTx/ltc',auth,getTxDetailLtc);

router.get('/history/btc',auth,getHistoryBtc);

router.get('/detailTx/btc',auth,getTxDetailBtc);

router.get('/history/bch',auth,getHistoryBch);

router.get('/detailTx/bch',auth,getTxDetailBch);

router.get('/history/eth',auth,getHistoryEth);

router.get('/history/usdtEth',auth,getHistoryUsdtEth);

router.get('/history/dash',auth,getHistoryDash);

router.get('/detailTx/dash',auth,getTxDetailDash);

/* POST */

router.post('/transaction/eth',auth,transactionEth);

router.post('/transaction/btc',auth,transactionBtc);

router.post('/transaction/bch',auth,transactionBch);

router.post('/transaction/ltc',auth,transactionLtc);

router.post('/transaction/usdtEth',auth,transactionUsdtEth);

router.post('/transaction/dash',auth,transactionDash);

/* PUT */

router.put('/create/walletEth',auth,createWalletEth);

router.put('/create/walletBtc',auth,createWalletBtc);

router.put('/create/walletBch',auth,createWalletBch);

router.put('/create/walletLtc',auth,createWalletLtc);

router.put('/create/walletDash',auth,createWalletDash);

router.put('/create/walletUsdtEth',auth,createWalletUsdtEth);

export default router;

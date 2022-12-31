'use strict';

import User from '../models/SchemaUser';
import WalletEth from '../services/walletEth';
import WalletBtc from '../services/walletBtc';
import WalletBch from '../services/walletBch';
import WalletLtc from '../services/walletLtc';
import WalletUsdtEth from '../services/WalletUsdtEth';
import WalletDash from '../services/walletDash';

export const createWalletUsdtEth = async (req, res) => {
  try {
    let wallet = walletUsdtEth.create();
    const user = await User.updateOne({
      _id: req.user
    }, {
      $set: {
        walletUsdtEth: wallet
      }
    });
    if (user.n > 0 && user.ok > 0) return res.status(201).send({
      message: 'cartera creada con exito'
    });
    res.status(400).send({
      error: 'No se pudo crear su cartera'
    });
  } catch (err) {
    console.log(err)
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}

export const createWalletEth = async (req, res) => {
  try {
    let wallet = WalletEth.create();
    const user = await User.updateOne({
      _id: req.user
    }, {
      $set: {
        walletEth: wallet
      }
    });
    if (user.n > 0 && user.ok > 0) return res.status(201).send({
      message: 'cartera creada con exito'
    });
    res.status(400).send({
      error: 'No se pudo crear su cartera'
    });
  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}

export const transactionEth = async (req, res) => {
  try {
    let {
      toAddress,
      amount
    } = req.body;
    let person = await User.findOne({
      _id: req.user
    }, {
      walletEth: true
    });
    let transaction = await WalletEth.transaction(person.walletEth.privateKey, person.walletEth.address, toAddress, amount)
    if (transaction.status === 201) return res.status(transaction.status).send({
      hash: transaction.hash,
      amount: amount,
      fromAddress: person.walletEth.address,
      toAddress: toAddress
    });

    res.status(transaction.status).send({
      error: transaction.error
    })

  } catch (err) {
    res.status(err.status).send({
      error: err.message
    });
  }
}



export const getBalanceEth = async (req, res) => {
  try {
    let person = await User.findOne({
      _id: req.user
    }, {
      walletEth: true
    });
    let wallet = await WalletEth.getBalance(person.walletEth.address);
    if (wallet.status === 200) return res.status(wallet.status).send({
      balance: wallet.balance
    });
    res.status(wallet.status).send({
      error: wallet.error
    })

  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}

export const getBalanceUsdtEth = async (req, res) => {
  try {
    let person = await User.findOne({
      _id: req.user
    }, {
      walletUsdtEth: true
    });
    let wallet = await WalletUsdtEth.getBalance(person.walletUsdtEth.address);
    if (wallet.status === 200) return res.status(wallet.status).send({
      balance: wallet.balance
    });
    res.status(wallet.status).send({
      error: wallet.error
    })

  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}


export const createWalletBtc = async (req, res) => {
  try {
    let wallet = WalletBtc.create();
    const user = await User.updateOne({
      _id: req.user
    }, {
      $set: {
        walletBtc: wallet
      }
    });
    if (user.n > 0 && user.ok > 0) return res.status(201).send({
      message: 'cartera creada con exito'
    });
    res.status(400).send({
      error: 'No se pudo crear su cartera'
    });
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
}

export const getBalanceBtc = async (req, res) => {
  try {
    let person = await User.findOne({
      _id: req.user
    }, {
      walletBtc: true
    });
    let wallet = await WalletBtc.getBalance(person.walletBtc.address);
    if (wallet.status === 200) return res.status(wallet.status).send({
      balance: wallet.balance
    });
    res.status(wallet.status).send({
      error: wallet.error
    })
  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}

export const createWalletBch = async (req, res) => {
  try {
    let wallet = WalletBch.create();
    const user = await User.updateOne({
      _id: req.user
    }, {
      $set: {
        walletBch: wallet
      }
    });
    if (user.n > 0 && user.ok > 0) return res.status(201).send({
      message: 'cartera creada con exito'
    });
    res.status(400).send({
      error: 'No se pudo crear su cartera'
    });
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
}

export const getBalanceBch = async (req, res) => {
  try {
    let person = await User.findOne({
      _id: req.user
    }, {
      walletBch: true
    });
    let wallet = await WalletBch.getBalance(person.walletBch.address);
    res.status(wallet.status).send({
      balance: wallet.balance
    });
  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}


export const createWalletLtc = async (req, res) => {
  try {
    let wallet = WalletLtc.create();
    const user = await User.updateOne({
      _id: req.user
    }, {
      $set: {
        walletLtc: wallet
      }
    });
    if (user.n > 0 && user.ok > 0) return res.status(201).send({
      message: 'cartera creada con exito'
    });
    res.status(400).send({
      error: 'No se pudo crear su cartera'
    });
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
}

export const getBalanceLtc = async (req, res) => {
  try {
    let person = await User.findOne({
      _id: req.user
    }, {
      walletLtc: true
    });
    let wallet = await WalletLtc.getBalance(person.walletLtc.address);
    if (wallet.status === 200) return res.status(wallet.status).send({
      balance: wallet.balance
    });
    res.status(wallet.status).send({
      error: wallet.error
    })
  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}

export const transactionBtc = async (req, res) => {
  try {
    let {
      toAddress,
      amount
    } = req.body;
    let person = await User.findOne({
      _id: req.user
    }, {
      walletBtc: true
    });
    let transaction = await WalletBtc.transaction(person.walletBtc.privateKey, person.walletBtc.address, toAddress, amount)
    res.status(transaction.status).send({data:transaction.data})
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
}

export const transactionBch = async (req, res) => {
  try {
    let {
      toAddress,
      amount
    } = req.body;
    let person = await User.findOne({
      _id: req.user
    }, {
      walletBch: true
    });
    let transaction = await WalletBch.transaction(person.walletBch.privateKey, person.walletBch.address, toAddress, amount)
    res.status(transaction.status).send({data:transaction.data})
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
}

export const transactionLtc = async (req, res) => {
  try {
    let {
      toAddress,
      amount
    } = req.body;
    let person = await User.findOne({
      _id: req.user
    }, {
      walletLtc: true
    });
    let transaction = await WalletLtc.transaction(person.walletLtc.privateKey, person.walletLtc.address, toAddress, amount)
    res.status(transaction.status).send({data:transaction.data})
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
}

export const getHistoryLtc = async (req, res) => {
  try {
    let person = await User.findOne({
      _id: req.user
    }, {
      walletLtc: true
    });
    let result = await WalletLtc.getHistory(person.walletLtc.address);
    res.status(result.status).send(result.transaction)
  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}

export const getTxDetailLtc = async (req, res) => {
  try {
    let {tx} = req.body;
    let result = await WalletLtc.getTxDetail(tx);
    res.status(result.status).send(result.transaction)
  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}

export const getHistoryBtc = async (req, res) => {
  try {
    let person = await User.findOne({
      _id: req.user
    }, {
      walletBtc: true
    });
    let result = await WalletBtc.getHistory(person.walletBtc.address);
    res.status(result.status).send(result.transaction)
  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}

export const getTxDetailBtc = async (req, res) => {
  try {
    let {tx} = req.body;
    let result = await WalletBtc.getTxDetail(tx);
    res.status(result.status).send(result.transaction)
  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}

export const getHistoryBch = async (req, res) => {
  try {
    let person = await User.findOne({
      _id: req.user
    }, {
      walletBch: true
    });
    let result = await WalletBch.getHistory(person.walletBch.address);
    res.status(result.status).send(result.transaction)
  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}


export const getTxDetailBch = async (req, res) => {
  try {
    let {tx} = req.body;
    let result = await WalletBch.getTxDetail(tx);
    res.status(result.status).send(result.transaction)
  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}

export const getHistoryEth = async (req, res) => {
  try {
    let person = await User.findOne({
      _id: req.user
    }, {
      walletEth: true
    });
    let result = await WalletEth.getHistory(person.walletEth.address);
    res.status(result.status).send(result.transaction)
  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}

export const getHistoryUsdtEth = async (req, res) => {
  try {
    let {type} = req.body;
    let person = await User.findOne({
      _id: req.user
    }, {
      walletUsdtEth: true
    });
    let result = await WalletUsdtEth.getHistoric(person.walletUsdtEth.address,type);
    res.status(result.status).send(result.transaction)
  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}

export const transactionUsdtEth = async (req, res) => {
  try {
    let {
      toAddress,
      amount
    } = req.body;
    let person = await User.findOne({
      _id: req.user
    }, {
      walletUsdtEth: true
    });
    let transaction = await WalletUsdtEth.transaction(person.walletUsdtEth.privateKey, person.walletUsdtEth.address, toAddress, amount)
    if (transaction.status === 201) return res.status(transaction.status).send({
      hash: transaction.hash,
      amount: amount,
      fromAddress: person.walletUsdtEth.address,
      toAddress: toAddress
    });

    res.status(transaction.status).send({
      error: transaction.error
    })

  } catch (err) {
    console.log(err)
    res.status(err.status).send({
      error: err.message
    });
  }
}

export const createWalletDash = async (req, res) => {
  try {
    let wallet = WalletDash.create();
    const user = await User.updateOne({
      _id: req.user
    }, {
      $set: {
        walletDash: wallet
      }
    });
    if (user.n > 0 && user.ok > 0) return res.status(201).send({
      message: 'cartera creada con exito'
    });
    res.status(400).send({
      error: 'No se pudo crear su cartera'
    });
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
}

export const getBalanceDash = async (req, res) => {
  try {
    let person = await User.findOne({
      _id: req.user
    }, {
      walletDash: true
    });
    let wallet = await WalletDash.getBalance(person.walletDash.address);
    if (wallet.status === 200) return res.status(wallet.status).send({
      balance: wallet.balance
    });
    res.status(wallet.status).send({
      error: wallet.error
    })

  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}

export const getHistoryDash = async (req, res) => {
  try {
    let person = await User.findOne({
      _id: req.user
    }, {
      walletDash: true
    });
    let result = await WalletDash.getHistory(person.walletDash.address);
    res.status(result.status).send(result.transaction)
  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}


export const getTxDetailDash = async (req, res) => {
  try {
    let {tx} = req.body;
    let result = await WalletDash.getTxDetail(tx);
    res.status(result.status).send(result.transaction)
  } catch (err) {
    res.status(500).send({
      error: 'Error en el servidor'
    });
  }
}


export const transactionDash = async (req, res) => {
  try {
    let {
      toAddress,
      amount
    } = req.body;
    let person = await User.findOne({
      _id: req.user
    }, {
      walletDash: true
    });
    let transaction = await WalletDash.transaction(person.walletDash.privateKey, person.walletDash.address, toAddress, amount)
    res.status(transaction.status).send({data:transaction.data})
  } catch (err) {
    console.log('err=>',err)
    res.status(500).send({
      error: err
    });
  }
}
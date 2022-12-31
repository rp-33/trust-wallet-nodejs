'use strict';

import * as litcoin from 'bitcoinjs-lib';
import litecore from 'bitcore-lib-ltc';
import configuration from '../configuration';
import axios from 'axios';

const TOKEN = configuration.blockcypher.token;
const URL = 'https://api.blockcypher.com/v1/ltc/main';
const UNIT_SATOSHI = 1e8;
const FEE = 2000;

class WalletLtc {


  create() {
    const LITECOIN = 
    {
      messagePrefix: '\x19Litecoin Signed Message:\n',
      bech32: 'ltc',
      bip32: {
        public: 0x019da462,
        private: 0x019d9cfe,
      },
      pubKeyHash: 0x30,
      scriptHash: 0x32,
      wif: 0xb0,
    } 


    let keyPair = litcoin.ECPair.makeRandom({
      network: LITECOIN
    });
    let publicKey = keyPair.publicKey
    const {
      address
    } = litcoin.payments.p2pkh({
      pubkey: publicKey,
      network: LITECOIN,
    });
    const privateKey = keyPair.toWIF();

    let walletLtc = {
      'address': address,
      'privateKey': privateKey,
      'publicKey' : publicKey.toString('hex')
    }

    return walletLtc;

  }

   async getBalance(address) {
    try 
    {

      let response = await axios.get(`${URL}/addrs/${address}?token=${TOKEN}`);
      return {
        status : response.status,
        balance : response.data.final_balance/UNIT_SATOSHI,
        txrefs : response.data.txrefs
      }
    }
    catch(err)
    {
      throw err;
    }
  }


  async transaction(privateKey, myAddress, toAddress, amount) {
    try
    {
      let balanceResponse = await this.getBalance(myAddress);
      
      if(balanceResponse.txrefs == undefined)  throw 'has unconfirmed transactions, wait while the network finishes confirming the transactions';
  

      let script = new litecore.Script(new litecore.Address(myAddress)).toHex();
  
      let transaction = new litecore.Transaction();

      for(let i=0;i<balanceResponse.txrefs.length;i++)
      {
        let item = balanceResponse.txrefs[i];
        let utxo = {
          "txId": item.tx_hash,
          "outputIndex": item.tx_output_n,
          "address": myAddress,
          "script": script,
          "satoshis": item.value
        };
        
        transaction.from(utxo)

      }

      let balance = balanceResponse.balance * UNIT_SATOSHI;

      let outputAmount = (amount * UNIT_SATOSHI) - FEE;//unidades de satoshi   

      if(balance < outputAmount) throw 'insufficient balance sheet';
      
      transaction.fee(FEE);
      transaction.to(toAddress,outputAmount);
      transaction.sign(privateKey);
      let tx = transaction.serialize();
      let tx_hash = await axios.post(`${URL}/txs/push?token=${TOKEN}`,{"tx":tx});
      return {
        status : tx_hash.status,
        data :tx_hash.data
      }
    
    }
    catch(err)
    {
      throw err;
    }

  }

  async getHistory(address) {
    try 
    {

      let response = await axios.get(`${URL}/addrs/${address}?token=${TOKEN}`);
      return{
        status : response.status,
        transaction : response.data.txrefs
      }
    }
    catch(err)
    {
      throw err;
    }
  }

  async getTxDetail(tx) {
    try 
    {

      let response = await axios.get(`${URL}/txs/${tx}?token=${TOKEN}`);
      return{
        status : response.status,
        transaction : response.data
      }
    }
    catch(err)
    {
      throw err;
    }
  }

}

export default new WalletLtc;

'use strict';

import * as bitcoin from 'bitcoinjs-lib';
import bitcore from 'bitcore-lib';
import configuration from '../configuration';
import axios from 'axios';


const TOKEN = configuration.blockcypher.token;
const UNIT_SATOSHI = 1e8;
const URL = configuration.environment == 'develop' ? 'https://api.blockcypher.com/v1/btc/test3' : 'https://api.blockcypher.com/v1/btc/main'
const FEE = 1000;

class WalletBtc {


  create() {
    const NETWORKS = configuration.environment == 'develop' ? bitcoin.networks.testnet : bitcoin.networks.mainnet;
    var keyPair = bitcoin.ECPair.makeRandom({network : NETWORKS});
    const privateKey = keyPair.toWIF();
    const publicKey = keyPair.publicKey; 
    const {address} = bitcoin.payments.p2pkh({pubkey: publicKey,network: NETWORKS});

    return {
      'address': address,
      'privateKey': privateKey,
      'publicKey' : publicKey.toString('hex')
    }
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
  

      let script = new bitcore.Script(new bitcore.Address(myAddress)).toHex();
  
      let transaction = new bitcore.Transaction();

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

export default new WalletBtc;

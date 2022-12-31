'use strict';

import dashcore from '@dashevo/dashcore-lib';
import configuration from '../configuration';
import axios from 'axios';

const TOKEN = configuration.blockcypher.token;
const URL = 'https://api.blockcypher.com/v1/dash/main';
const FEE = 1000;
const UNIT_DECIMALS = 1e8;
//dashcore.Networks.defaultNetwork = dashcore.Networks.testnet;

class WalletDash{

	create() {
		var privateKey = new dashcore.PrivateKey();
		var address = privateKey.toAddress();
		let WalletDash = {
			'address' : address,
			'privateKey' :  privateKey
		}
 		return WalletDash;
	}

	async getBalance(address) {
        try 
        {
    
          let response = await axios.get(`${URL}/addrs/${address}?token=${TOKEN}`);
          return {
            status : response.status,
            balance : response.data.final_balance / UNIT_DECIMALS,
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
    
          let script = new dashcore.Script(new dashcore.Address(myAddress)).toHex();
      
          let transaction = new dashcore.Transaction();
    
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
    
          let balance = balanceResponse.balance * UNIT_DECIMALS;
     
          let outputAmount = (amount * UNIT_DECIMALS) - FEE;
    
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

export default new WalletDash;

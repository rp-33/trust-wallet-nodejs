'use strict';

import bitcore from 'bitcore-lib-cash';
import configuration from '../configuration';
import axios from 'axios';
import BCHJS from '@psf/bch-js';

const URL = "https://api.blockchair.com/bitcoin-cash";
const UNIT_SATOSHI = 1e8;
const FEE = 1000;

let bchjs = new BCHJS({ restURL: configuration.bch.BCH_MAIN });

class WalletBch{

	create() {
		var privateKey = new bitcore.PrivateKey();
		var address = privateKey.toAddress();
		let walletBtc = {
			'address' : address,
			'privateKey' :  privateKey
		}
 		return walletBtc;
	}

	async getBalance(address){
		try{
	    	let response = await axios.get(`${URL}/dashboards/address/${address}?transaction_details=true`);
	    	let data = response.data.data[address];
	    	return {
        		status : response.status,
        		balance : data.address.balance/UNIT_SATOSHI,
        		output_n : data.address.output_count,
       			utxo : data.utxo
      		}
	 	} 
	 	catch(err) {
	    	throw err;
	  	}
	}

	async transaction(privateKey, myAddress, toAddress, amount){
		try{

			let balanceResponse = await this.getBalance(myAddress);
      
      		if(balanceResponse.utxo.length == 0)  throw 'has unconfirmed transactions, wait while the network finishes confirming the transactions';
      	
			let script = new bitcore.Script(new bitcore.Address(myAddress)).toHex();
		
      		let transaction = new bitcore.Transaction();

      		for(let i=0;i<balanceResponse.utxo.length;i++){
        		let item = balanceResponse.utxo[i];
        		let utxo = {
          		"txId": item.transaction_hash,
          		"outputIndex": item.index,
          		"address": myAddress,
          		"script": script,
          		"satoshis": item.value
        		};
        
       			transaction.from(utxo)
      		}

      		let balance = balanceResponse.balance * UNIT_SATOSHI;//unidades de satoshi
      		let outputAmount = (amount * UNIT_SATOSHI) - FEE;//unidades de satoshi   

      		if(balance < outputAmount) throw 'insufficient balance sheet';
      
     		transaction.fee(FEE);
      		transaction.to(toAddress,outputAmount);
      		transaction.sign(privateKey);
      		let tx = transaction.serialize();
      		let tx_hash = await bchjs.RawTransactions.sendRawTransaction(tx) //await axios.get(`https://api.blockchair.com/bitcoin-cash/raw/transaction/${tx}`);
 			if(tx_hash) return {status:201,data:tx_hash}
   
      	}
      	catch(err){
      		throw err;
      	}
	}


	async getHistory(address){
		try
		{
			let response = await axios.get(`${URL}/dashboards/address/${address}?transaction_details=true`);
	    	let data = response.data.data[address];
	    	return {
        		status : response.status,
        		transaction : data.transactions
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

      		let response = await axios.get(`${URL}/dashboards/transaction/${tx}`);
      		let data = response.data.data[tx];
      		return{
        		status : response.status,
        		transaction : data
      		}
    	}
    	catch(err)
    	{
      		throw err;
    	}
  	}
}

export default new WalletBch;

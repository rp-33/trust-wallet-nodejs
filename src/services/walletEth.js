'use strict';
import wallet from 'ethereumjs-wallet';
import Web3 from 'web3';
import EthereumTx from 'ethereumjs-tx';
import configuration from '../configuration';
import axios from 'axios';

const URL = "https://api.blockchair.com/ethereum/testnet";

class WalletEth{

	constructor()
	{
		this.web3js = new Web3(configuration.infura.provider);
	}

	create()
	{

		let ethWallet = wallet.generate();

		let walletEth = {
			'address' : ethWallet.getAddressString(),
			'privateKey' :  ethWallet.getPrivateKeyString()
		}

		return walletEth;
	}

	getBalance(address)
	{
		return new Promise( ( resolve , reject ) =>{
        try
        {

            this.web3js.eth.getBalance(address,(err,balance)=>{
		          if(err) {
		    		reject({
		              status : 400,
		              error : 'Su direccion no existe'
		            })
		  	       }else{
		  					resolve({
		  						status:200,
		  						balance : this.web3js.utils.fromWei(balance, "ether")
		  					})
		  				}
            })

        }
        catch(err)
        {
            reject({
                status : 500,
                error : 'ha ocurrido un error'
            })
        }
        })

	}

	transaction(privatekey,myAddress,toAddress,amount)
	{

        return new Promise( ( resolve , reject ) =>{
        try
        {
            var addressKey = Buffer.from(privatekey.substring(2,66), 'hex')
            this.web3js.eth.getTransactionCount(myAddress).then(txCount=>{

                var rawTransaction = {
                    nonce: this.web3js.utils.toHex(txCount),
                    gasPrice: this.web3js.utils.toHex(this.web3js.utils.toWei("2", "gwei")),
                    gasLimit: this.web3js.utils.toHex(21000),
                    to: toAddress,
                    value: this.web3js.utils.toHex(this.web3js.utils.toWei(amount)),
                }

                //creamos la transaccion
                var transactioneth = new EthereumTx(rawTransaction);
                //firmando la transaccion
                transactioneth.sign(addressKey);
                //sending transacton via web3js module
                this.web3js.eth.sendSignedTransaction('0x'+transactioneth.serialize().toString('hex'))
                .on('transactionHash', hash=>{
                    resolve({
                        status:201,
                        hash : hash
                    })
                })
                .on('error', err=>{
                    reject({
                        status : 500,
                        message : 'Error en la transferencia'
                    })
                });

            })



        }
        catch(err)
        {
            reject({
                status : 500,
                error : 'ha ocurrido un error'
            })
        }
        })

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



export default new WalletEth;

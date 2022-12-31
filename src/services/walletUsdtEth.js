'use strict';
import wallet from 'ethereumjs-wallet';
import Web3 from 'web3';
import EthereumTx from 'ethereumjs-tx';
import configuration from '../configuration';
import erc20abi from '../contracts/erc20.abi.json';

const UNIT_DECIMALS = 1e6;

class WalletUsdtEth {

  constructor() {
    this.web3js = new Web3(configuration.infura.provider);
    this.usdtContract = new this.web3js.eth.Contract(
      erc20abi,
      '0xdac17f958d2ee523a2206206994597c13d831ec7' //USDT mainnet contract address
      //'0xB404c51BBC10dcBE948077F18a4B8E553D160084'  //USDT ropsten contract address
      //'0xaFF4481D10270F50f203E0763e2597776068CBc5' //WEENUS goerli contract address
    );
  }

  create() {

    let ethWallet = wallet.generate();

    let walletEth = {
      'address': ethWallet.getAddressString(),
      'privateKey': ethWallet.getPrivateKeyString()
    }

    return walletEth;
  }

  async getBalance(address) {
    
    return new Promise((resolve, reject) => {
      try {
        this.usdtContract.methods.balanceOf(address).call(
          function(error, result) {
            if (error) {
              reject({
                status: 400,
                error: 'Dirección inválida'
              })
            } else {
              resolve({
                status: 200,
                balance: result / UNIT_DECIMALS
              })
            }
          }
        )
      } catch (err) {
        reject({
          status: 500,
          error: 'ha ocurrido un error'
        })
      }
    })
  }

  transaction(privatekey,myAddress,toAddress,amount)
	{
    
        return new Promise( ( resolve , reject ) =>{
        try
        {
          let usdtContract = new this.web3js.eth.Contract(
            erc20abi,
            '0xdac17f958d2ee523a2206206994597c13d831ec7', //USDT mainnet contract address
            //'0xB404c51BBC10dcBE948077F18a4B8E553D160084'  //USDT ropsten contract address
            //'0xaFF4481D10270F50f203E0763e2597776068CBc5' //WEENUS goerli contract address
            {from: myAddress}
          );
            var addressKey = Buffer.from(privatekey.substring(2,66), 'hex');
            this.web3js.eth.getTransactionCount(myAddress).then(txCount=>{
                
                var rawTransaction = {
                    from : myAddress,
                    nonce: this.web3js.utils.toHex(txCount),
                    gas: this.web3js.utils.toHex(100),
                    gasPrice: this.web3js.utils.toHex(100),
                    gasLimit: this.web3js.utils.toHex(21000),
                    to: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                    value: 0x0,
                    data: usdtContract.methods.transfer(toAddress,this.web3js.utils.toHex(10)).encodeABI(),
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
                  console.log('error=>',err)
                    reject({
                        status : 500,
                        message : 'Error en la transferencia'
                    })
                });

            })



        }
        catch(err)
        {
          console.log(err)
            reject({
                status : 500,
                error : 'ha ocurrido un error'
            })
        }
        })

	}


  async getHistoric(address, type) {

    if (type == "to") {
      return new Promise((resolve, reject) => {

        try {

            this.usdtContract.getPastEvents('Transfer', {
              filter: {
                to: address
              },
              fromBlock: 1,
            },
            (err, events) => {
              if (err) {
                reject({
                  status: 400,
                  error: 'Error consultando datos a la Blockchain'
                })
              } else {
                resolve({
                  status: 200,
                  transaction: events
                })
              }
            });
        } catch (err) {
          reject({
            status: 500,
            error: 'ha ocurrido un error'
          })
        }
      })
    };
    if (type == "from") {
      return new Promise((resolve, reject) => {

        try {

          this.usdtContract.getPastEvents('Transfer', {
              filter: {
                from: address
              },
              fromBlock: 1,
            },
            (err, events) => {
              if (err) {
                reject({
                  status: 400,
                  error: 'Error consultando datos a la Blockchain'
                })
              } else {
                resolve({
                  status: 200,
                  transaction: events
                })
              }
            });
        } catch (err) {
          console.log(err)
          reject({
            status: 500,
            error: 'ha ocurrido un error'
          })
        }
      })
    }


  }


}

export default new WalletUsdtEth;
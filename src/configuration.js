'use strict';

import dotenv from 'dotenv';

dotenv.config();

let configuration = {
	environment: process.env.ENVIRONMENT,
	server:{
		port : process.env.PORT || process.env.SERVER_PORT
	},
 	db:{
 		port: process.env.ENVIRONMENT === 'develop' ? process.env.DB_PORT_DEVELOP : process.env.DB_PORT_PRODUCTION
 	},
 	token :{
 		secret : process.env.TOKEN
 	},
 	infura : {
 		provider : process.env.ENVIRONMENT === 'develop' ? process.env.INFURA_PROVIDER_ROPSTEN : process.env.INFURA_PROVIDER_MAINNET
 	},
 	bcoin : {
 		apiKey : process.env.BCOIN_API
 	},
	blockcypher : {
		token : process.env.BCYPHER_TOKEN
	},
	bch : {
		net : process.env.BCH_NET,
		urlMain : process.env.BCH_MAIN,
		urlTest : process.env.BCH_TEST
	}
};

export default configuration;

'use strict';

import {Schema,model} from 'mongoose';

let walletSchema = new Schema({
	address : {
		type : String
	},
	publicKey : {
		type : String
	},
	privateKey : {
		type : String
	}
})


export default walletSchema;

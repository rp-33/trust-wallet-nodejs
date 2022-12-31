'use strict';

import {Schema,model} from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import moment from 'moment';
import wallet from './SchemaWallet';
import walletBch from '../services/walletBch';

let userSchema = new Schema({
  create_at : {
    type : Date,
    default : moment()
  },
	userName:{
		type:String,
		lowercase: true,
    required:[true, '{PATH} es obligatorio.']
	},
	email :{
		type:String,
		unique:true,
		lowercase: true,
		required:[true, '{PATH} es obligatorio.']
	},
	password:{
		type:String,
		required:[true, '{PATH} es obligatorio.']
	},
  phone : {
    type: Number
  },
  notifications : {
    type : Boolean,
    default : true,
    enum : [true,false]
  },
  stateApp:{
    type:String,
    default : 'active',
    enum: ['active','background','inactive']
  },
  tokenMobile:{
    type:String
  },
  walletBtc : wallet,
  walletEth : wallet,
  walletLtc : wallet,
  walletBch : wallet,
  walletUsdtEth : wallet,
  walletDash : wallet
})


userSchema.pre('save',function(next){ 

    if (!this.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {

       if (err) return next(err); 

       bcrypt.hash(this.password,salt,null,(hashError,hash)=>{

        if (hashError) return next(hashError);
        
        this.password = hash;

        next();
        
       });

    });
});

export default model('User',userSchema)

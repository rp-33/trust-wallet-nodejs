'use strict';

import bcrypt from 'bcrypt-nodejs';

export const comparePassword = (password,dbPassword)=>{
	return bcrypt.compareSync(password,dbPassword)
};

export const hashPassword = (password)=>{
	return bcrypt.hashSync(password.toLocaleLowerCase())
}
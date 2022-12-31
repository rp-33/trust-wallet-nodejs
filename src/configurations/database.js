'use strict';

import mongoose from 'mongoose';

class Database{
	
	connect(url)
	{
		mongoose.connect(url,{useCreateIndex: true, useNewUrlParser: true})
		.then(db => console.log(`db is conected ${url}`))
		.catch(err => console.log(err));
	}
}

export default new Database;
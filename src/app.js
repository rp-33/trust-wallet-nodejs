'use strict';

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import bodyParser  from 'body-parser';
import http from 'http';
import configuration from './configuration';
import ip from 'ip';
import Database from './configurations/database';
import router from './routes';

global.config = configuration;

class Server{
	constructor(){
		this.configuration = configuration;
		this.app = express();
	}

	main(app)
	{
		app.set('port',this.configuration.server.port);
		app.use(logger('dev'));
		app.use(express.json());
		app.use(express.urlencoded({ extended: false }));
		app.use(cookieParser());
		app.use(bodyParser.urlencoded({extended: false}));
		app.use(cors());
		app.use(express.static(path.join(__dirname, 'public')));
		app.use('/uploads', express.static(__dirname +'/../uploads'));
		router(app);
	}

	db(port)
	{
		Database.connect(port);
	}



	listen()
	{
		this.main(this.app);
		this.server = http.createServer(this.app);
		this.server.listen(this.configuration.server.port, () => {	
			console.log(`listener ${ip.address()}:${this.configuration.server.port}`);
			this.db(this.configuration.db.port);
		})

	}

}

export default new Server;
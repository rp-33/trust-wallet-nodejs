'use strict';

import authRouter from './authRouter';
import walletRouter from './walletRouter';

const router  =  (app)=> {
	app.use('/api/v1',authRouter);
	app.use('/api/v1',walletRouter);
}

export default router;
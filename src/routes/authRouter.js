'use strict';

import Router from "express-promise-router";
import {auth} from '../middlewares';
import {
	signup,
	signin,
	logout
} from '../controllers/ctrlAuth';

const router = Router();

/* POST */

router.post('/signup',signup);

router.post('/signin',signin);

/* PUT */

router.put('/logout',auth,logout);

export default router;

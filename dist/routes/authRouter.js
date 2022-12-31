'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _middlewares = require('../middlewares');

var _ctrlAuth = require('../controllers/ctrlAuth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _expressPromiseRouter2.default)();

/* POST */

router.post('/signup', _ctrlAuth.signup);

router.post('/signin', _ctrlAuth.signin);

/* PUT */

router.put('/logout', _middlewares.auth, _ctrlAuth.logout);

exports.default = router;
//# sourceMappingURL=authRouter.js.map
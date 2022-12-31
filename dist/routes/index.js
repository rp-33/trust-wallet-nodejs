'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _authRouter = require('./authRouter');

var _authRouter2 = _interopRequireDefault(_authRouter);

var _walletRouter = require('./walletRouter');

var _walletRouter2 = _interopRequireDefault(_walletRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = function router(app) {
	app.use('/api/v1', _authRouter2.default);
	app.use('/api/v1', _walletRouter2.default);
};

exports.default = router;
//# sourceMappingURL=index.js.map
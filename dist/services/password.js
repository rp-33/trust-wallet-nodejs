'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.hashPassword = exports.comparePassword = undefined;

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comparePassword = exports.comparePassword = function comparePassword(password, dbPassword) {
	return _bcryptNodejs2.default.compareSync(password, dbPassword);
};

var hashPassword = exports.hashPassword = function hashPassword(password) {
	return _bcryptNodejs2.default.hashSync(password.toLocaleLowerCase());
};
//# sourceMappingURL=password.js.map
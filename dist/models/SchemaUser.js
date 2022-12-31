'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _SchemaWallet = require('./SchemaWallet');

var _SchemaWallet2 = _interopRequireDefault(_SchemaWallet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose.Schema({
  create_at: {
    type: Date,
    default: (0, _moment2.default)()
  },
  userName: {
    type: String,
    lowercase: true,
    required: [true, '{PATH} es obligatorio.']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, '{PATH} es obligatorio.']
  },
  password: {
    type: String,
    required: [true, '{PATH} es obligatorio.']
  },
  phone: {
    type: Number
  },
  notifications: {
    type: Boolean,
    default: true,
    enum: [true, false]
  },
  stateApp: {
    type: String,
    default: 'active',
    enum: ['active', 'background', 'inactive']
  },
  tokenMobile: {
    type: String
  },
  walletBtc: _SchemaWallet2.default,
  walletEth: _SchemaWallet2.default,
  walletLtc: _SchemaWallet2.default,
  walletBch: _SchemaWallet2.default
});

userSchema.pre('save', function (next) {
  var _this = this;

  if (!this.isModified('password')) return next();

  _bcryptNodejs2.default.genSalt(10, function (err, salt) {

    if (err) return next(err);

    _bcryptNodejs2.default.hash(_this.password, salt, null, function (hashError, hash) {

      if (hashError) return next(hashError);

      _this.password = hash;

      next();
    });
  });
});

exports.default = (0, _mongoose.model)('User', userSchema);
//# sourceMappingURL=SchemaUser.js.map
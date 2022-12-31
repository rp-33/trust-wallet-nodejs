'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var configuration = {
  server: {
    port: process.env.PORT || process.env.SERVER_PORT
  },
  db: {
    port: process.env.MONGODB_URI || process.env.DB_PORT
  },
  token: {
    secret: process.env.TOKEN
  },
  infura: {
    provider: process.env.INFURA_PROVIDER
  },
  bcoin: {
    apiKey: process.env.BCOIN_API
  }
};

exports.default = configuration;
//# sourceMappingURL=configuration.js.map
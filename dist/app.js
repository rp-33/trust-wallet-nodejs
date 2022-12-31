'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _configuration = require('./configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _ip = require('ip');

var _ip2 = _interopRequireDefault(_ip);

var _database = require('./configurations/database');

var _database2 = _interopRequireDefault(_database);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

global.config = _configuration2.default;

var Server = function () {
	function Server() {
		_classCallCheck(this, Server);

		this.configuration = config;
		this.app = (0, _express2.default)();
	}

	_createClass(Server, [{
		key: 'main',
		value: function main(app) {
			app.set('port', this.configuration.server.port);
			app.use((0, _morgan2.default)('dev'));
			app.use(_express2.default.json());
			app.use(_express2.default.urlencoded({ extended: false }));
			app.use((0, _cookieParser2.default)());
			app.use(_bodyParser2.default.urlencoded({ extended: false }));
			app.use((0, _cors2.default)());
			app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
			app.use('/uploads', _express2.default.static(__dirname + '/../uploads'));
			(0, _routes2.default)(app);
		}
	}, {
		key: 'db',
		value: function db(port) {
			_database2.default.connect(port);
		}
	}, {
		key: 'listen',
		value: function listen() {
			var _this = this;

			this.main(this.app);
			this.server = _http2.default.createServer(this.app);
			this.server.listen(this.configuration.server.port, function () {
				console.log('listener ' + _ip2.default.address() + ':' + _this.configuration.server.port);
				_this.db(_this.configuration.db.port);
			});
		}
	}]);

	return Server;
}();

exports.default = new Server();
//# sourceMappingURL=app.js.map
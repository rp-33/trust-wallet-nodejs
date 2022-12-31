'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeToken = exports.createToken = undefined;

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createToken = exports.createToken = function createToken(user, days) {
    var payload = {
        sub: user._id, // id del usuario
        iat: (0, _moment2.default)().unix(), //momento que se ha creado el token
        exp: (0, _moment2.default)().add(days, 'days').unix() //momento que sera expirado el token
    };
    return _jwtSimple2.default.encode(payload, config.token.secret);
}; //crea el token del usuario con una fecha de expiracion 

var decodeToken = exports.decodeToken = function decodeToken(token) {

    var decode = new Promise(function (resolve, reject) {
        try {
            var payload = _jwtSimple2.default.decode(token, config.token.secret);
            if (payload.exp < (0, _moment2.default)().unix()) {
                reject({
                    status: 403,
                    message: 'El token ha expirado'
                });
            }

            resolve({
                status: 200,
                id: payload.sub
            });
        } catch (err) {
            reject({
                status: 500,
                message: 'Token invalido'
            });
        }
    });

    return decode;
}; //decodifica el toquen para validar si tiene autorizacion o no
//# sourceMappingURL=token.js.map
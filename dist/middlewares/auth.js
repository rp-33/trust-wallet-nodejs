'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _token = require('../services/token');

var auth = function auth(req, res, next) {

    if (!req.headers.authorization) return res.status(403).send({ error: "No tienes autorizacion" });
    var token = req.headers.authorization.split(' ')[1]; //realizamos el Bearer para obtener el token
    (0, _token.decodeToken)(token).then(function (response) {
        req.user = response.id; //guardamos el usuario 
        next(); //pasamos al siguiente middlewares
    }).catch(function (error) {
        res.status(error.status).send({ error: error.message });
    });
};

exports.default = auth;
//# sourceMappingURL=auth.js.map
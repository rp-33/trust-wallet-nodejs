'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logout = exports.signin = exports.signup = undefined;

var _SchemaUser = require('../models/SchemaUser');

var _SchemaUser2 = _interopRequireDefault(_SchemaUser);

var _token = require('../services/token');

var _password = require('../services/password');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signup = exports.signup = async function signup(req, res) {
    try {
        var _req$body = req.body,
            email = _req$body.email,
            userName = _req$body.userName,
            password = _req$body.password;


        var person = await _SchemaUser2.default.findOne({ email: email.toLocaleLowerCase() }, { email: true });

        if (person) return res.status(400).send({ error: 'Correo ya existe.' });

        person = new _SchemaUser2.default({
            userName: userName,
            email: email,
            password: password
        });

        await person.save();

        res.status(201).send({
            _id: person._id,
            token: (0, _token.createToken)(person, 360),
            email: person.email,
            userName: person.userName,
            notifications: person.notifications,
            isAuthenticated: true
        });
    } catch (err) {
        res.status(500).send({ error: 'Error en el servidor' });
    }
};

var signin = exports.signin = async function signin(req, res) {
    var _req$body2 = req.body,
        email = _req$body2.email,
        password = _req$body2.password;


    var person = await _SchemaUser2.default.findOne({ "email": email.toLocaleLowerCase() });

    if (!person) return res.status(401).send({ error: 'Correo invalido' });

    if (!(0, _password.comparePassword)(password.toLocaleLowerCase(), person.password)) return res.status(403).send({ error: 'Contraseña invalida' });

    res.status(200).send({
        _id: person._id,
        token: (0, _token.createToken)(person, 360),
        email: person.email,
        userName: person.userName,
        notifications: person.notifications,
        isAuthenticated: true,
        addressEth: person.walletEth ? person.walletEth.address : null,
        addressBtc: person.walletBtc ? person.walletBtc.address : null,
        addressLtc: person.walletLtc ? person.walletLtc.address : null,
        addressBch: person.walletBch ? person.walletBch.address : null
    });
};

var logout = exports.logout = async function logout(req, res) {
    try {
        var person = await _SchemaUser2.default.findOne({ _id: req.user });
        if (!person) return res.status(400).send({ error: 'Usuario no existe' });
        res.status(204).send();
    } catch (err) {
        res.status(500).send({ error: 'Error en el servidor' });
    }
};
//# sourceMappingURL=ctrlAuth.js.map
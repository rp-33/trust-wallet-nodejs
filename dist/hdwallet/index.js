"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bip39 = require("bip39");
var HDkey = require("hdkey");

var _require = require('ethereumjs-wallet'),
    hdkey = _require.hdkey;

var mnemonicConfig = {
    strength: 128,
    rng: null,
    wordlist: null
};

var HDWallet = function () {
    // m/purpose'/coin_type'/account'/change/address_index

    function HDWallet() {
        _classCallCheck(this, HDWallet);

        this.config = mnemonicConfig;
    }

    _createClass(HDWallet, [{
        key: "generateSeed",
        value: async function generateSeed() {
            var password = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var mnemonic = arguments[1];

            if (mnemonic) {
                return await bip39.mnemonicToSeed(mnemonic, password);
            }
            var newMnemonic = bip39.generateMnemonic(this.config.strength, this.config.rng, this.config.wordlist);
            console.log("guardar:", newMnemonic);
            return await bip39.mnemonicToSeed(newMnemonic, password);
        }
    }, {
        key: "createAcount",
        value: function createAcount(seed, coin_type, account, change, address_index) {
            var root = hdkey.fromMasterSeed(seed);
            var changeNodeDerivationPath = "m/44'/" + coin_type + "'/" + account + "'/" + change;
            var changeNode = root.derivePath(changeNodeDerivationPath);
            var addrNode = changeNode.deriveChild(address_index);
            var privateKey = addrNode.getWallet().getPrivateKey().toString("hex");
            var publicKey = addrNode.getWallet().getPublicKey().toString("hex");
            var privateExtendedKey = addrNode.privateExtendedKey().toString("hex");
            var publicExtendedKey = addrNode.publicExtendedKey().toString("hex");
            var address = addrNode.getWallet().getAddress().toString("hex");
            console.log({
                privateKey: privateKey,
                publicKey: publicKey,
                privateExtendedKey: privateExtendedKey,
                publicExtendedKey: publicExtendedKey,
                address: address
            });
        }
    }]);

    return HDWallet;
}();

var wallet = new HDWallet();
var seed = wallet.generateSeed("", "fabric dose rural museum lemon trouble day whip follow cry metal inherit").then(function (seed) {
    wallet.createAcount(seed, 60, 0, 0, 0);
});
//# sourceMappingURL=index.js.map
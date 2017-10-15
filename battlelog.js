var config = require('./config').Configuration;
var weapon = require('./object/weapon');
var request = require('request');

module.exports = {
    getWeaponStats: function(callback) {
        var weaponStats = [];

        request.post(
            'http://battlelog.battlefield.com/bf4/warsawWeaponsPopulateStats/' + config.userId + '/4/stats/',
            function (err, res) {
                if (res != null) {
                    var body = JSON.parse(res.body);

                    body.data.mainWeaponStats.forEach(function (element) {
                        var w = weapon.getWeapon(element);
                        weaponStats.push(w);
                    }, this);

                    callback(weaponStats);
                } else {
                    console.log(err);
                }
            }
        );
    }
}
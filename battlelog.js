var config = require('./config').Configuration;
var weapon = require('./object/weapon');
var soldier = require('./object/soldier');
var locallog = require('./locallog');
var request = require('request');

module.exports = {
    getWeaponStats: function (callback) {
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

                    locallog.saveObject(JSON.stringify(weaponStats), config.localWeaponFile);
                    callback(weaponStats);
                } else {
                    console.log(err);
                }
            }
        );
    },
    getSoldierStats: function (callback) {
        request.post(
            'http://battlelog.battlefield.com/bf4/warsawoverviewpopulate/' + config.userId + '/4/',
            function (err, res) {
                if (res != null) {
                    var body = JSON.parse(res.body);

                    locallog.saveObject(JSON.stringify(body), config.localSoldierFile);
                    callback(soldier.getSoldier(body.data.overviewStats));
                } else {
                    console.log(err);
                }
            }
        )
    }
}
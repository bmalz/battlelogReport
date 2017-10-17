var config = require('./config').Configuration;
var weapon = require('./object/weapon');
var soldier = require('./object/soldier');
var locallog = require('./locallog');
var request = require('request');

var templateName;

module.exports = {
    getSoldier: function (callback) {
        request.get(
            config.baseUri + '/soldier/' + config.userName + '/stats/' + config.userId + '/ps3/', {
                headers: {
                    'X-AjaxNavigation': '1'
                }
            },
            function (err, res) {
                if (res != null) {
                    var body = JSON.parse(res.body);
                    if (body.template != null) {
                        var templateRegExp = /profile.(.*)stats/gi;
                        templateName = templateRegExp.exec(body.template)[1];
                        callback();
                    }
                }
            }
        )
    },
    getWeaponStats: function (callback) {
        var weaponStats = [];

        request.post(
            config.baseUri + templateName + 'WeaponsPopulateStats/' + config.userId + '/4/stats/',
            function (err, res) {
                if (res != null) {
                    var body = JSON.parse(res.body);

                    body.data.mainWeaponStats.forEach(function (element) {
                        var w = weapon.getWeapon(element);
                        weaponStats.push(w);
                    }, this);

                    //locallog.saveObject(JSON.stringify(weaponStats), config.localWeaponFile);
                    callback(weaponStats);
                } else {
                    console.log(err);
                }
            }
        );
    },
    getSoldierStats: function (callback) {
        request.post(
            config.baseUri + templateName + 'overviewpopulate/' + config.userId + '/4/',
            function (err, res) {
                if (res != null) {
                    var body = JSON.parse(res.body);

                    //locallog.saveObject(JSON.stringify(body), config.localSoldierFile);
                    callback(soldier.getSoldier(body.data.overviewStats));
                } else {
                    console.log(err);
                }
            }
        )
    }
}
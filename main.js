var config = require('./config').Configuration;
var battlelog = require('./battlelog');
var locallog = require('./locallog');

var lastWeaponStats = locallog.loadObject(config.localWeaponFile);

battlelog.getWeaponStats(getWeaponsCallback);

function getWeaponsCallback(data) {
    data.forEach(function(element) {
        //console.log(element.slug);
    }, this);
}
var config = require('./config').Configuration;
var battlelog = require('./battlelog');

battlelog.getWeaponStats(getWeaponsCallback);

function getWeaponsCallback(data) {
    data.forEach(function(element) {
        console.log(element.slug);
    }, this);
}
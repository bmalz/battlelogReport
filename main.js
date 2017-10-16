var config = require('./config').Configuration;
var battlelog = require('./battlelog');
var locallog = require('./locallog');

var lastWeaponStats = locallog.loadObject(config.localWeaponFile);
battlelog.getSoldierStats(getSoldierCallback);
battlelog.getWeaponStats(getWeaponsCallback);

function getSoldierCallback(soldierStats) {
    for(var propName in soldierStats) {
        if(soldierStats.hasOwnProperty(propName)) {
            var propValue = soldierStats[propName];
            console.log(propName + ': ' + propValue);
        }
    }
}

function getWeaponsCallback(weaponStats) {
    var differences = checkWeaponStatsDifferences(weaponStats, lastWeaponStats)
    console.log(differences.length);

    differences.forEach(function (element) {
        console.log(element.slug);
        if (element.serviceStars) console.log('Service stars: ' + element.serviceStars);
        if (element.kills) console.log('Kills: ' + element.kills);
        if (element.headshots) console.log('Headshots: ' + element.headshots);
        if (element.accuracy) console.log('Accuracy: ' + element.accuracy);
        if (element.timeEquipped) console.log('timeEquipped: ' + element.timeEquipped);
    }, this);
}

function checkWeaponStatsDifferences(battlelogData, locallogData) {
    var differences = [];
    battlelogData.forEach(function (battlelogElement) {
        var locallogElement = getBattellogElement(locallogData, battlelogElement.slug);
        if (locallogElement) {
            var diffElement = {};
            diffElement.slug = battlelogElement.slug;
            diffElement.serviceStars = compareElements(battlelogElement.serviceStars, locallogElement.serviceStars);
            diffElement.kills = compareElements(battlelogElement.kills, locallogElement.kills);
            diffElement.headshots = compareElements(battlelogElement.headshots, locallogElement.headshots);
            diffElement.accuracy = compareElements(battlelogElement.accuracy, locallogElement.accuracy);
            diffElement.timeEquipped = compareElements(battlelogElement.timeEquipped, locallogElement.timeEquipped);

            if (diffElement.serviceStars || diffElement.kills || diffElement.headshots || diffElement.accuracy || differences.timeEquipped)
                differences.push(diffElement);
        }
    }, this);

    return differences;
}

function getBattellogElement(locallogData, slug) {
    if (locallogData) {
        for (var i = 0; i < locallogData.length; i++) {
            var element = locallogData[i];
            if (element.slug == slug) {
                return element;
            }
        }
    } else {
        return null;
    }
}

function compareElements(battlelogDataValue, locallogDataValue) {
    var battlelogDataValueNumber = Number(battlelogDataValue);
    var locallogDataValueNumber = Number(locallogDataValue);
    if (battlelogDataValueNumber - locallogDataValueNumber != 0) {
        return battlelogDataValueNumber - locallogDataValueNumber;
    } else
        return null;
}
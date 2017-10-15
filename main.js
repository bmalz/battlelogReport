var request = require('request');

request.post(
    'http://battlelog.battlefield.com/bf4/warsawWeaponsPopulateStats/392794828/4/stats/', 
    function(err, res) {
        if(res != null) {
            var body = JSON.parse(res.body);
            
            body.data.mainWeaponStats.forEach(function(element) {
                console.log('\n==> Weapon: ' + element.slug);
                console.log('Category: ' + element.category);
                console.log('Stars: ' + element.serviceStars);
                console.log('Kills: ' + element.kills);
                console.log('Headshots: ' + element.headshots);
                console.log('Shots fired: ' + element.shotsFired);
                console.log('Accuracy: ' + Number(element.accuracy) * 100);
                console.log('Time equipped: ' + element.timeEquipped);
            }, this);
        }
        else
            console.log(err);
    }
);
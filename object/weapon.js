module.exports = {
    getWeapon: function(element) {
        return { 
            slug: element.slug,
            category: element.category,
            serviceStars: element.serviceStars,
            kills: element.kills,
            headshots: element.headshots,
            shotsFired: element.shotsFired,
            accuracy: Number(element.accuracy) * 100,
            timeEquipped: element.timeEquipped
        };
    }
}
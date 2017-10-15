var config = require('./config').Configuration;
var file = require('fs');

module.exports = {
    loadObject: function(fileName) {
        var f = file.readFileSync(fileName, "utf8", function(err, data) {
            if (err) 
                return null;
        });

        return JSON.parse(f);
    },
    saveObject: function(data, fileName) {
        file.writeFile(fileName, data, new function(err, data) {
            if(err)
                throw err;
        });
    }
}
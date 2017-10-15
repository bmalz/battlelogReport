var config = require('./config').Configuration;
var file = require('fs');

module.exports = {
    loadObject: function(fileName) {
        var f = file.readFileSync(fileName, "utf8", function(err, data) {
            if (err) 
                return [];
        });

        if(f != null && f != "")
            return JSON.parse(f);
        else
            return [];
    },
    saveObject: function(data, fileName) {
        file.writeFile(fileName, data, new function(err, data) {
            if(err)
                throw err;
        });
    }
}
'user strict';
var key = "2d67453d891444d7b3a09515e952c145"

//Task object constructor
var Task = function (data) {
    this.latitude = data.latitude;
    this.longitude = data.longitude;
};
Task.getGeoLocalisationData = function reverse(data, result) {
    lat = data.latitude
    long = data.longitude
    link = "https://api.opencagedata.com/geocode/v1/json?key=" + key + "&q=" + lat + "%2C" + long + "&pretty=1&no_annotations=1&fbclid=IwAR2zgG0IUXc3Ilbcfs9MFQRgWov7_-TsExrYUVIE_JFvlXtBlbxg_khXhkA"
    var request = require('request');
    return new Promise(function (resolve, reject) {
        request(link, function (error, response, body) {
            if (error) {
                reject(err);
            } else {
                console.log('statusCode:', response && response.statusCode);
                resolve(JSON.parse(body));
            }
        });
    })
};



module.exports = Task;
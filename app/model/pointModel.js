'user strict';
var sql = require('./db.js');
var reverse = require('./geoCoderModel.js');

//Point object constructor
var Point = function (point) {
    this.latitude = point.latitude;
    this.longitude = point.longitude;
    this.suburb = point.suburb;
    this.city = point.city;
};
Point.createPoint = function createPoint(newPoint, result) {
    console.log("---- create point ----");
    checkOldPoint = Point.checkExistedPoint(newPoint)

    checkOldPoint.then(function res1(oldPoint) {
        if(oldPoint.length > 0){
            console.log("old point already exist");
            result(null, oldPoint[0].pointid);
        }else{
            console.log("---- Point not found ----");
            console.log("---- create new point ----");
            data = reverse.getGeoLocalisationData(newPoint)
            data.then(function(res) {
                suburb = res.results[0].components.suburb;
                city = res.results[0].components.city;
                !suburb ? suburb = city  : null;
                newPoint.suburb = suburb;
                newPoint.city = city;
                console.log("---- Point with geolocalisation Data ----");
                console.log(newPoint);
                sql.query("INSERT INTO point set ?", newPoint, function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                    }
                    else {
                        
                        result(null, res.insertId);
                    }
                });
            }).catch(function(e) {
                console.log(e); // "zut !"
            }).then(function(e) {
                console.log('après le catch, la chaîne est restaurée');
            });
        }
    })
    
};

Point.checkExistedPoint = function checkExist(newPoint) {
    return new Promise(function (resolve, reject) {
        sql.query("Select * from point where latitude = ? and longitude = ?", [newPoint.latitude, newPoint.longitude], function (err, res) {
            if (err) {
                reject(err);
            } else {
                console.log("res here")
                console.log(res)
                resolve(res);
            }
        });
    })
};

Point.getPointById = function createPoint(pointId, result) {
    sql.query("Select point from point where pointid = ? ", pointId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
Point.getAllPoint = function getAllPoint(result) {
    sql.query("Select * from point", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('point : ', res);

            result(null, res);
        }
    });
};
Point.updateById = function (pointid, point, result) {
    sql.query("UPDATE point SET point = ? WHERE pointid = ?", [point.point, pointid], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Point.remove = function (pointid, result) {
    sql.query("DELETE FROM point WHERE pointid = ?", [pointid], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};

module.exports = Point;
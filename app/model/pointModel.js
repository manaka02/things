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
    reverse.reverseGeoLocate(newPoint, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            newPoint.geoData = res;
            console.log("res.results")
            console.log(JSON.stringify(newPoint.geoData.results[0].components.suburb))
            // sql.query("INSERT INTO point set ?", newPoint, function (err, res) {
            //     if (err) {
            //         console.log("error: ", err);
            //         result(err, null);
            //     }
            //     else {
            //         console.log(res.insertId);
            //         result(null, res.insertId);
            //     }
            // });
            result(err, null);
        }
    });
    // sql.query("INSERT INTO point set ?", newPoint, function (err, res) {

    //     if (err) {
    //         console.log("error: ", err);
    //         result(err, null);
    //     }
    //     else {
    //         console.log(res.insertId);
    //         result(null, res.insertId);
    //     }
    // });
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
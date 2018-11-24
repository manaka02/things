'user strict';
var sql = require('./db.js');
var point = require('./pointModel.js');

//Trajet object constructor
var Trajet = function (trajet) {
    this.datecreation = new Date();
    this.datedepart = trajet.datedepart;
    this.statut = 1;
    this.depart = trajet.depart;
    this.destination = trajet.destination;
};


Trajet.createTrajet = function createTrajet(newTrajet, result) {
    console.log("------ create trajet ------")

    PointList = [];

    var promises = [newTrajet.depart, newTrajet.destination].map(function (name) {
        return new Promise(function (resolve, reject) {
            point.createPoint(name, function (err, pointid) {
                if (err) { return reject(err); }
                console.log("pointid");
                console.log(pointid);
                PointList.push(pointid);
                resolve();
            });
        });
    });

    Promise.all(promises)
        .then(function () {
            console.log(PointList);
            newTrajet.depart = PointList[0];
            newTrajet.destination = PointList[1];
            console.log(newTrajet);
            sql.query("INSERT INTO trajet set ?", newTrajet, function (err, res) {

                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            })
        });
};

Trajet.getTrajetById = function createUser(trajetId, result) {
    sql.query("Select * from trajet where trajetid = ? ", trajetId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Trajet.getTrajetByTargetName = function getByTarget(targetName, result) {
    sql.query("Select * from trajetpersub3 where destinationsub = ? ", targetName, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Trajet.getAllTrajet = function getAllTrajet(geocoding) {
    ;
    // sql.query("Select * from trajet", function (err, res) {

    //     if (err) {
    //         console.log("error: ", err);
    //         result(null, err);
    //     }
    //     else {
    //         console.log('trajet : ', res);

    //         result(null, res);
    //     }
    // });
};
Trajet.updateById = function (trajetid, trajet, result) {
    sql.query("UPDATE trajet SET trajet = ? WHERE trajetid = ?", [trajet.trajet, trajetid], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Trajet.remove = function (trajetid, result) {
    sql.query("DELETE FROM trajet WHERE trajetid = ?", [trajetid], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};

module.exports = Trajet;
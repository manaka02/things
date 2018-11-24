'user strict';
var sql = require('./db.js');
var point = require('./pointModel.js');

//Trajet object constructor
var Trajet = function (trajet) {
    this.datecreation = new Date();
    this.trajetId = trajet.trajetId;
    this.userid = trajet.userid;
    this.datedepart = trajet.datedepart;
    this.statut = trajet.statut;
    this.depart = trajet.depart;
    this.destination = trajet.destination;
    trajet.statut? null : this.statut = 1; 
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
            delete newTrajet.userid;
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

Trajet.disable = function disable(trajetId, result) {
    sql.query("UPDATE trajet SET statut = 0 WHERE trajetid = ?", trajetId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Trajet.getAllTrajet = function getAllTrajet(result) {

    sql.query("Select * from trajet where statut = 1", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('trajet : ', res);

            result(null, res);
        }
    });
};

Trajet  .getAllTrajetWithJoinCount = function getAllTrajet(status, result) {
    request = "Select * from news limit 3"
    if (status) {
        request = "Select * from news where statut = 1 limit 3";
    }
    sql.query(request, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
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
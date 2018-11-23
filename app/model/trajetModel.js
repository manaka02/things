'user strict';
var sql = require('./db.js');

//Trajet object constructor
var Trajet = function (trajet) {
    this.datecreation = new Date();
    this.datedepart = trajet.trajet;
    this.statut = trajet.status;
    this.status = trajet.status;
    this.created_at = new Date();
};
Trajet.createTrajet = function createUser(newTrajet, result) {
    sql.query("INSERT INTO trajet set ?", newTrajet, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Trajet.getTrajetById = function createUser(trajetId, result) {
    sql.query("Select trajet from trajet where trajetid = ? ", trajetId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
Trajet.getAllTrajet = function getAllTrajet(result) {
    sql.query("Select * from trajet", function (err, res) {

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
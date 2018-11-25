'user strict';
var sql = require('./db.js');

//Task object constructor
var Task = function (task) {
    this.status = task.status;
};
module.exports = Task;

var getDateValide = function (result) {
    request = "Select * from news where datedepart < now()"
    sql.query(request, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res);
            sql.query("UPDATE trajet SET statut = -1 WHERE trajetid = ?", function (err, res) {
                result(null, res);
            });
        }
    });

};
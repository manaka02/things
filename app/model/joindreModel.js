'user strict';
var sql = require('./db.js');

//Task object constructor
var Task = function (task) {
    this.userid = task.userid;
    this.trajetid = task.trajetid;
    this.statut = task.statut;
};

Task.cancelJoin = function cancelJoin(join, result) {
    sql.query("UPDATE joindre SET statut = 0 WHERE userid = ? AND trajetid = ?", [join.userid, join.trajetid], function(error, data) {
        if(error) result(error, null);
        else result(null, data);
    });
};

Task.join = function join(newTask, result) {
    console.log("create a new join");
    sql.on('error', function() {console.log("error: ", err);});
    sql.query("INSERT INTO joindre set ?", newTask, function (err, res) {

        if (err) {
            console.log("error: ", err.code);
            console.log("mankato ve");
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};
Task.getById = function createUser(joindreid, result) {
    sql.query("Select * from joindre where joindreid = ? ", joindreid, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
Task.getAll = function getAllTask(result) {
    sql.query("Select * from joindre", function (err, res) {

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
Task.updateById = function (joindreid, data, result) {
    sql.query("UPDATE joindre SET trajetid = ? and userid = ? WHERE joindreid = ?", [data.trajetid, data.userid, joindreid], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Task.remove = function (joindreid, result) {
    sql.query("DELETE FROM joindre WHERE joindreid = ?", [joindreid], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Task;
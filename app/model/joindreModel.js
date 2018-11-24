'user strict';
var sql = require('./db.js');

//Task object constructor
var Task = function (task) {
    this.userid = task.userid;
    this.trajetid = task.trajetid;
};

Task.join = function join(newTask, result) {
    sql.query("INSERT INTO joindre set ?", newTask, function (err, res) {

        if (err) {
            console.log("error: ", err);
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
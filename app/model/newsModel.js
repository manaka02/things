'user strict';
var sql = require('./db.js');

//Task object constructor
var Task = function (task) {
    this.status = task.status;
};



module.exports = Task;
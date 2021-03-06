'use strict';

var Task = require('../model/appModel.js');

exports.list_all_tasks = function (req, res) {
    Task.getAllTask(function (err, task) {
        res.header("Access-Control-Allow-Origin", "*");
        console.log('controller')
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });
        else
            res.send(task);
    });
};



exports.create_a_task = function (req, res) {
    var new_task = new Task(req.body);

    //handles null error 
    if (!new_task.task || !new_task.status) {

        res.status(400).send({ error: true, message: 'Please provide task/status' });

    }
    else {

        Task.createTask(new_task, function (err, task) {
            res.header("Access-Control-Allow-Origin", "*");
            if (err){
                res.status(400).send({ error: true, message: err.sqlMessage });
            }else{
                res.json(task);
            }
        });
    }
};


exports.read_a_task = function (req, res) {
    Task.getTaskById(req.params.taskId, function (err, task) {
        res.header("Access-Control-Allow-Origin", "*");
        if (err){
            res.status(400).send({ error: true, message: err.sqlMessage });
        }else{
            res.json(task);
        }
    });
};


exports.update_a_task = function (req, res) {
    Task.updateById(req.params.taskId, new Task(req.body), function (err, task) {
        res.header("Access-Control-Allow-Origin", "*");
        if (err){
            res.status(400).send({ error: true, message: err.sqlMessage });
        }else{
            res.json(task);
        }
    });
};


exports.delete_a_task = function (req, res) {
    Task.remove(req.params.taskId, function (err, task) {
        res.header("Access-Control-Allow-Origin", "*");
        if (err){
            res.status(400).send({ error: true, message: err.sqlMessage });
        }else{
            
            res.json(task);
        }
    });
};
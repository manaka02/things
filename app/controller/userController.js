// 'use strict';

var user = require('../model/userModel.js');

exports.list_all_users = function (req, res) {
    user.getAllUser(function (err, user) {
        res.header("Access-Control-Allow-Origin", "*");
        console.log('controller')
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });
        else
            res.send(user);
    });
};



exports.create_a_user = function (req, res) {
    var new_user = new user(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    //handles null error 
    console.log('all data')
    console.log(new_user)

    if (!new_user.nom || !new_user.prenom || !new_user.cin || !new_user.contact || !new_user.email || !new_user.password) {

        res.status(400).send({ error: true, message: 'You send an incomplete data' });

    }
    else {

        user.createUser(new_user, function (err, user) {

            if (err)
                res.status(400).send({ error: true, message: err.sqlMessage });
            else
                res.json(user);
        });
    }
};

exports.search_a_user = function (req, res) {
    
    var new_user = new user(req.body);
    console.log(new_user);
    if (!new_user.email || !new_user.password) {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(400).send({ error: true, message: 'Invalid mail/password' });
    }
    else {
        
        user.searchUser(new_user, function (err, user) {
            res.header("Access-Control-Allow-Origin", "*");
            if (err)
                res.status(400).send({ error: true, message: err.sqlMessage });
            else
                res.json(user);
        });
    }
};




exports.read_a_user = function (req, res) {
    user.getUserById(req.params.userId, function (err, user) {
        res.header("Access-Control-Allow-Origin", "*");
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });
        else
            res.json(user);
    });
};


exports.update_a_user = function (req, res) {
    user.updateById(req.params.userId, new user(req.body), function (err, user) {
        res.header("Access-Control-Allow-Origin", "*");
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });
        else
            res.json(user);
    });
};


exports.delete_a_user = function (req, res) {
    user.remove(req.params.userId, function (err, user) {
        res.header("Access-Control-Allow-Origin", "*");
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });
        else
            res.json({ message: 'user successfully deleted' });
    });
};
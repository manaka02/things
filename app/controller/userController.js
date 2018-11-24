'use strict';

var user = require('../model/userModel.js');

exports.list_all_users = function (req, res) {
    user.getAllUser(function (err, user) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', user);
        res.send(user);
    });
};



exports.create_a_user = function (req, res) {
    var new_user = new user(req.body);

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
            res.json(user);
        });
    }
};

exports.search_a_user = function (req, res) {
    var new_user = new user(req.body);

    //handles null error 
    console.log('all data next')
    console.log(new_user)

    if (!new_user.email || !new_user.password) {

        res.status(400).send({ error: true, message: 'Invalid mail/password' });
    }
    else {
        user.searchUser(new_user, function (err, user) {

            if (err)
                res.send(err);
            res.json(user);
        });
    }
};




exports.read_a_user = function (req, res) {
    user.getuserById(req.params.userId, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.update_a_user = function (req, res) {
    user.updateById(req.params.userId, new user(req.body), function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.delete_a_user = function (req, res) {
    user.remove(req.params.userId, function (err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'user successfully deleted' });
    });
};
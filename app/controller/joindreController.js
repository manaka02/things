'use strict';

var Join = require('../model/joindreModel.js');

exports.list_all_joins = function (req, res) {
    Join.getAll(function (err, join) {

        console.log('controller')
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });

        console.log('res', join);
        res.send(join);
    });
};



exports.create_a_join = function (req, res) {
    var new_join = new Join(req.body);

    //handles null error 
    if (!new_join.userid || !new_join.trajetid) {
        res.status(400).send({ error: true, message: 'Invalid/incomplete data' });
    }
    else {
        Join.join(new_join, function (err, join) {
            if (err)
                res.status(400).send({ error: true, message: err.sqlMessage });
            res.json(join);
        });
    }
};


exports.read_a_join = function (req, res) {
    Join.getById(req.params.joindreId, function (err, join) {
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });

        res.json(join);
    });
};


exports.update_a_join = function (req, res) {
    Join.updateById(req.params.joindreId, new Join(req.body), function (err, join) {
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });

        res.json(join);
    });
};


exports.delete_a_join = function (req, res) {
    Join.remove(req.params.joindreId, function (err, join) {
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });
        res.json({ message: 'Join successfully deleted' });
    });
};
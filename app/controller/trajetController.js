'use strict';

var Trajet = require('../model/trajetModel.js');

exports.list_all_trajets = function (req, res) {
    Trajet.getAllTrajet(function (err, trajet) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', trajet);
        res.send(trajet);
    });
};



exports.create_a_trajet = function (req, res) {
    var new_trajet = new Trajet(req.body);

    //handles null error 
    if (!new_trajet.trajet || !new_trajet.status) {

        res.status(400).send({ error: true, message: 'Please provide trajet/status' });

    }
    else {

        Trajet.createTrajet(new_trajet, function (err, trajet) {

            if (err)
                res.send(err);
            res.json(trajet);
        });
    }
};


exports.read_a_trajet = function (req, res) {
    Trajet.getTrajetById(req.params.trajetId, function (err, trajet) {
        if (err)
            res.send(err);
        res.json(trajet);
    });
};


exports.update_a_trajet = function (req, res) {
    Trajet.updateById(req.params.trajetId, new Trajet(req.body), function (err, trajet) {
        if (err)
            res.send(err);
        res.json(trajet);
    });
};


exports.delete_a_trajet = function (req, res) {
    Trajet.remove(req.params.trajetId, function (err, trajet) {
        if (err)
            res.send(err);
        res.json({ message: 'Trajet successfully deleted' });
    });
};
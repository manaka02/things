'use strict';

var Trajet = require('../model/trajetModel.js');
var Point = require('../model/pointModel.js');
var Join = require('../model/joindreModel.js');
var reverse = require('../model/geoCoderModel.js');

exports.list_all_trajets = function (req, res) {
    Trajet.getAllTrajet(function (err, trajet) {
        res.header("Access-Control-Allow-Origin", "*");
        console.log('controller')
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });
        else
            res.send(trajet);
    });
};

exports.list_all_trajets_with_join = function (req, res) {
    var new_trajet = new Trajet(req.body);
    Trajet.getAllTrajetWithJoinCount(new_trajet, function (err, trajet) {
        res.header("Access-Control-Allow-Origin", "*");
        console.log('controller')
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });
        else
            res.send(trajet);
    });
};

exports.list_all_depart_for_one_coordinate = function (req, res) {
    console.log("list all depart for one coordinate")
    var localisation = new Point(req.body);
    //handles null error 
    console.log(localisation)
    console.log(localisation.longitude)
    if (!localisation.latitude || !localisation.longitude) {
        res.status(400).send({ error: true, message: 'Invalid/incomplete data format' });
    }
    else {
        Trajet.getAllTrajetByCoordinate(localisation, function (err, trajet) {
            res.header("Access-Control-Allow-Origin", "*");
            console.log('controller')
            if (err)
                res.status(400).send({ error: true, message: err.sqlMessage });
            else
                res.send(trajet);
        });
    }
};

exports.create_a_trajet = function (req, res) {
    var new_trajet = new Trajet(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    //handles null error 
    console.log(JSON.stringify(new_trajet))
    if (!new_trajet.datedepart || !new_trajet.depart || !new_trajet.destination) {
        res.status(400).send({ error: true, message: 'Invalid data format' });
    }
    else {

        Trajet.createTrajet(new_trajet, function (err, trajet) {

            if (err)
                res.status(400).send({ error: true, message: err.sqlMessage });
            else
                res.json(trajet);
        });
    }
};

exports.create_a_trajet2 = function (req, res) {
    console.log(" create trajet add make a join");
    var new_trajet = new Trajet(req.body);
    var userid = new_trajet.userid;

    //handles null error 
    console.log(JSON.stringify(new_trajet))
    if (!new_trajet.userid || !new_trajet.datedepart || !new_trajet.depart || !new_trajet.destination) {

        res.status(400).send({ error: true, message: 'Invalid data format' });

    }
    else {
        // res.status(200).send({ success: true, message: "'c'est ok" });
        // trajet_id = 0;
        var promise = new Promise(function (resolve, reject) {
            console.log(" create trajet and add to database");
            Trajet.createTrajet(new_trajet, function (err, res) {
                res.header("Access-Control-Allow-Origin", "*");
                if (err) { return reject(err); }
                console.log("trajetId");
                new_trajet.trajetid = res
                resolve();
            });
        });

        promise.then(function () {
            console.log(" create a join then");
            console.log(new_trajet);
            let data = { userid: userid, trajetid: new_trajet.trajetid };
            Join.join(data, function (err, join) {
                if (err)
                    res.status(400).send({ error: true, message: err.sqlMessage });
                else
                    res.json(join);
            });
        });

    }
};

exports.read_a_trajet = function (req, res) {
    Trajet.getTrajetById(req.params.trajetId, function (err, trajet) {
        res.header("Access-Control-Allow-Origin", "*");
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });
        else
            res.json(trajet);
    });
};

exports.read_by_name = function (req, res) {
    Trajet.getTrajetByTargetName(req.params.targetName, function (err, trajet) {
        res.header("Access-Control-Allow-Origin", "*");
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });
        else
            res.json(trajet);
    });
};


exports.update_a_trajet = function (req, res) {
    Trajet.updateById(req.params.trajetId, new Trajet(req.body), function (err, trajet) {
        res.header("Access-Control-Allow-Origin", "*");
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });
        else
            res.json(trajet);
    });
};

exports.disable = function (req, res) {
    var new_trajet = new Trajet(req.body);
    console.log(new_trajet);
    res.header("Access-Control-Allow-Origin", "*");
    if (!new_trajet.trajetId) {
        res.status(400).send({ error: true, message: 'add a valid trajetId' });
    }
    Trajet.disable(new_trajet.trajetId, function (err, trajet) {
        if (err)
            res.status(400).send({ error: true, message: "Impossible de mettre à jour le statut du trajet" });
        else
            res.status(200).send({ success: true, message: "Mis à jour OK" });
    });
};


exports.delete_a_trajet = function (req, res) {
    Trajet.remove(req.params.trajetId, function (err, trajet) {
        res.header("Access-Control-Allow-Origin", "*");
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });
        else
            res.json({ message: 'Trajet successfully deleted' });
    });
};
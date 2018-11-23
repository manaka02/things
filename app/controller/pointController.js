'use strict';

var point = require('../model/pointModel.js');

exports.list_all_points = function (req, res) {
    point.getAllPoint(function (err, point) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', point);
        res.send(point);
    });
};



exports.create_a_point = function (req, res) {
    var new_point = new point(req.body);

    //handles null error 
    console.log('all data')
    console.log(new_point)

    if (!new_point.latitude || !new_point.longitude) {
        res.status(400).send({ error: true, message: 'You send an incomplete/malformed data' });
    }
    else {
        point.createPoint(new_point, function (err, point) {
            if (err)
                res.send(err);
            res.json(point);
        });
    }
};

exports.read_a_point = function (req, res) {
    point.getPointById(req.params.pointId, function (err, point) {
        if (err)
            res.send(err);
        res.json(point);
    });
};


exports.update_a_point = function (req, res) {
    point.updateById(req.params.pointId, new point(req.body), function (err, point) {
        if (err)
            res.send(err);
        res.json(point);
    });
};


exports.delete_a_point = function (req, res) {
    point.remove(req.params.pointId, function (err, point) {
        if (err)
            res.send(err);
        res.json({ message: 'point successfully deleted' });
    });
};

// GRANT ALL ON hackathon.* TO 'DESKTOP-FGMHHEE'@'192.168.1.7' IDENTIFIED BY 'root';
var news = require('../model/newsModel.js');

exports.check_Date_Valide = function (req, res) {
    news.getDateValide(function (err, task) {
        res.header("Access-Control-Allow-Origin", "*");
        //  console.log('controller')
        if (err)
            res.status(400).send({ error: true, message: err.sqlMessage });
        else {
            res.send(task);
        }

    });
};
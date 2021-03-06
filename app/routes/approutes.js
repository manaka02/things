'use strict';
module.exports = function (app) {
    var todoList = require('../controller/appController');
    var user = require('../controller/userController');
    var point = require('../controller/pointController');
    var trajet = require('../controller/trajetController');
    var join = require('../controller/joindreController');
    var news = require('../controller/newsController');
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    // cancel join
    app.route('/cancel')
        .post(join.cancel_join);

    // todoList Routes
    app.route('/tasks')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);

    //userRoutes
    app.route('/users')
        .get(user.list_all_users)
        .post(user.create_a_user);

    app.route('/users/:userId')
        .get(user.read_a_user)
        .put(user.update_a_user)
        .delete(user.delete_a_user);

    app.route('/login')
        .post(user.search_a_user);
    //pointRoutes
    app.route('/points')
        .get(point.list_all_points)
        .post(point.create_a_point);

    app.route('/points/:pointId')
        .get(point.read_a_point)
        .put(point.update_a_point)
        .delete(point.delete_a_point);


    //trajetRoutes
    app.route('/trajets')
        .get(trajet.list_all_trajets)
        .post(trajet.create_a_trajet);

    //trajetRoutes
    app.route('/news')
        .get(trajet.list_all_trajets_with_join)

    //trajetRoutes
    app.route('/trajets-disable')
        .post(trajet.disable);

    //trajetRoutes
    app.route('/trajets2')
        .post(trajet.create_a_trajet2);

    app.route('/trajetpercoordinate')
        .post(trajet.list_all_depart_for_one_coordinate);


    app.route('/trajetsbyname/:targetName')
        .get(trajet.read_by_name)

    app.route('/trajet/:trajetId')
        .get(trajet.read_a_trajet)
        .put(trajet.update_a_trajet)
        .delete(trajet.delete_a_trajet);

    //trajetRoutes
    app.route('/join')
        .get(join.list_all_joins)
        .post(join.create_a_join);

    app.route('/join/:joindreId')
        .get(join.read_a_join)
        .put(join.update_a_join)
        .delete(join.delete_a_join);

    // app.route('/datevalide')
    //     .get(news.check_Date_Valide)
};
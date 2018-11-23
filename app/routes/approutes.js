'use strict';
module.exports = function (app) {
    var todoList = require('../controller/appController');
    var user = require('../controller/userController');
    var point = require('../controller/pointController');
    var trajet = require('../controller/trajetController');

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

    app.route('/trajet/:trajetId')
        .get(trajet.read_a_trajet)
        .put(trajet.update_a_trajet)
        .delete(trajet.delete_a_trajet);
};
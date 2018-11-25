#!/usr/bin/env node

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
port = process.env.PORT || 3000;

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// var allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'example.com');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');

//   next();
// }
app.use(allowCrossDomain);

var routes = require('./app/routes/approutes'); //importing route
routes(app); //register the route
module.exports = function (express, routes) {
  var app = express();
  Object.keys(routes).forEach(function (verb) {
     var endpoints = routes[verb];
     Object.keys(endpoints).forEach(function (endpoint) {
       app[verb].call(app, endpoint, endpoints[endpoint]);
     });
  });
  return app;
};

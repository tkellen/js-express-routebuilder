module.exports = function (router, routes, prefix) {
  prefix = prefix||'';
  Object.keys(routes).forEach(function (verb) {
     var endpoints = routes[verb];
     Object.keys(endpoints).forEach(function (endpoint) {
       router[verb].call(router, prefix+endpoint, endpoints[endpoint]);
     });
  });
  return router;
};

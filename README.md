# express-routebuilder [![Build Status](https://secure.travis-ci.org/tkellen/node-express-routebuilder.png?branch=master)](http://travis-ci.org/tkellen/node-express-routebuilder)
> Simple declarative route configuration for Express without leaky abstractions.

## Example

```js
var express = require('express');
var routeBuilder = require('express-routebuilder');
var app = express();

var routes = {
  all: {
    '*': [
      function (req, res, next) { console.log('yo'); next(); }
    ]
  },
  get: {
    '/': [
      function (req, res, next) { console.log('index middleware'); next(); },
      function (req, res) { res.send(200); }
    ]
  },
  post: {
    //...
  }
};

app.use(routeBuilder(express, routes));
app.use('/namespaced', routeBuilder(express, routes));

```

## Release History

* 2012-01-16 - v0.1 - initial release

# express-routebuilder [![Build Status](https://secure.travis-ci.org/tkellen/node-express-routebuilder.png?branch=master)](http://travis-ci.org/tkellen/node-express-routebuilder)
> Simple declarative route configuration for Express without leaky abstractions.

### Motivation

Express embraces an imperative approach to configuring routes. This means that registering multiple
routes requires multiple method calls, so that one ends up with a file that may look something to the effect of:

```js
var express = require('express');
var app = express();

app.all('*', auth);
app.get('/profile', fnOne, fnTwo);
app.get('/about', aboutFn);
app.post('/logout', logoutFn);
// ...and so on
```

This works fine, but some people prefer a declarative approach for the sake of tidiness, readability,
or organization. The declarative approach to the above code would read like the following:

```js
var routes = {
  all: {
    '*': auth
  },
  get: {
    '/profile': [fnOne, fnTwo],
    '/about': aboutFn
  },
  post: {
    '/logout': logoutFn
  }
};
```

While Express doesn't provide any mechanism to work with such an object, this library does.

### Example

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

routeBuilder(app, routes);
```

### Use Outside of Express

Although this library was built to be used with Express, it doesn't depend on any feature unique to Express. In fact,
it can be used for any library that implements a similar API. We encourage you to review
[the source](https://github.com/tkellen/node-express-routebuilder/blob/v2.0.0/index.js) – it's only a few lines of code!


### Upgrade Guide 1.x -> 2.0

The latest release, 2.0, includes a breaking API change. Before, your code may have looked something like:

```js
// v1.x API
app.use(routeBuilder(express, routes));
```

Upgrading is simply a matter of refactoring that to be of this form:

```js
// v2.x API
routeBuilder(app, routes, prefix);
```

If you were namespacing routes you will now need to use either an
[Express router](http://expressjs.com/api.html#router) or sub-application.
In the following example, we will show how to accomplish this using a Router.

```js
// v1.x namespacing API
app.use('/namespace', routeBuilder(express, routes));

// v2.x namespacing API
app.use('/namespace', routeBuilder(express.Router(), routes));
// or
app.use(routeBuilder(express.Router(), routes, '/namespace'));
```

### Release History
* 2014-02-01 - v2.1.0 - Support prefix parameter.

* 2014-12-30 - v2.0.0 - Express applications are no longer created by the library. This has two benefits:
  1. It removes any coupling that this library had to Express
  2. When used with Express, it enables one to specify options for the routes configured by RouteBuilder

* 2014-03-07 - v1.0.0 - No changes. Just a version bump.
* 2014-01-16 - v0.1.0 - Initial release

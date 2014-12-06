const assert = require('assert');
const sinon = require('sinon');
const routeBuilder = require('../index');

describe('Routebuilder', function() {
  beforeEach(function() {
    this.router = {};
    this.spy = sinon.spy();
    this.routes = {};
  });

  afterEach(function() {
    this.spy.reset();
  });

  describe('passing an object with a name', function() {
    beforeEach(function() {
      this.router.get = this.spy;
      this.routes.get = {
        '/': ['one', 'two']
      };
      routeBuilder(this.router, this.routes);
    });

    it('should execute the associated method once', function() {
      assert(this.router.get.calledOnce);
    });

    it('should execute the method with the context of the router', function() {
      assert(this.router.get.calledOn(this.router));
    });

    it('should pass the route and the associated object as the arguments', function() {
      assert(this.router.get.calledWith('/', ['one', 'two']));
    });
  });
});

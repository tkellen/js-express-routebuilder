const express = require('express');
const test = require('tap').test;
const routeBuilder = require('../index');

test("build routes from a hash", function (t) {
  var app = routeBuilder(express, require('./fixtures/routes'));
  t.equal(app.routes.get.length, 3);
  t.equal(app.routes.post.length, 2);
  t.equal(app.routes.put.length, 2);
  t.equal(app.routes.patch.length, 2);
  t.end();
});

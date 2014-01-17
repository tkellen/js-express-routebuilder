var models = [
  { id: 1, name: 'one' },
  { id: 2, name: 'two' }
];

var beforeAll = function (res, res, next) {
  // do some middleware
  next();
};

var authenticate = function (req, res, next) {
  // do auth
  next();
};

var controller = {
  findById: function (req, res, next) {
    res.model = models[(req.params.id-1)];
    next();
  },
  findAll: function (req, res, next) {
    res.collecton = models;
    next();
  },
  showOne: function (req, res) {
    res.json(res.model);
  },
  showMany: function (req, res) {
    res.json(res.collection);
  },
  create: function (req, res) {
    // create something
    res.send(201);
  },
  update: function (req, res) {
    // update something
    res.send(200);
  },
  delete: function (req, res) {
    // delete something
    res.send(204);
  }
};

module.exports = {
  all: {
    '*': [
      beforeAll
    ]
  },
  get: {
    '/': [
      controller.findAll,
      controller.showMany
    ],
    '/:id': [
      controller.findById,
      controller.showOne
    ]
  },
  post: {
    '/': [
      authenticate,
      controller.create
    ],
  },
  put: {
    '/:id': [
      authenticate,
      controller.findById,
      controller.update
    ]
  },
  patch: {
    '/:id': [
      authenticate,
      controller.findById,
      controller.update
    ]
  },
  delete: {
    '/:id': [
      authenticate,
      controller.findById,
      controller.delete
    ]
  }
};



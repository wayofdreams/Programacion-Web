const router = require(__dirname + '/api.routes');

module.exports = function APIModule(app) {

  app.use('/api', router);
};

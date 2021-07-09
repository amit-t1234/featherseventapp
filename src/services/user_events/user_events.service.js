// Initializes the `user_events` service on path `/user-events`
const { UserEvents } = require('./user_events.class');
const createModel = require('../../models/user_events.model');
const hooks = require('./user_events.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user-events', new UserEvents(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-events');

  service.hooks(hooks);
};

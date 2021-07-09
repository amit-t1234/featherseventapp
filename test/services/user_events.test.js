const assert = require('assert');
const app = require('../../src/app');

describe('\'user_events\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-events');

    assert.ok(service, 'Registered the service');
  });
});

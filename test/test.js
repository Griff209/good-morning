const assert = require('assert');
const events = require('events');
const client = require('../library/client.js');

describe('client', function() {
  describe('response', function() {
    it('exists', function() {
      assert(client.response);
    });
  });

  describe('#request()', function() {
    it('returns an event emitter', function() {
      assert(client.request('JSON',{},() => 0).constructor === events.EventEmitter);
    });
  });
});
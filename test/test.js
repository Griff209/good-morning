const assert = require('assert');

const client = Object.create(null);

client.response = {
  body: {
    Births: 'The Jan',
    Events: [{
      text: 'The jan is born',
    }]
  },
};

//Reference 
/*
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
*/

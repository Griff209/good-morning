const http = require('http');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const response = {};

module.exports.response = response;
module.exports.request = request;

function request(bodyType, options, eventHandler) {
  let body = ''
  
  let req = http.request(options, (res) => {
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      console.log(`Request completed with code ${[response.statusCode = req.res.statusCode]}`);
      let supported = 'JSON';
      switch(String(bodyType).toUpperCase()) {
        case 'JSON': 
          response.body = JSON.parse(body).data;
          eventEmitter.emit('done');
          break;
        default: 
          throw new Error(`first argument to client.request must be one of ${supported}`);
      }
    });
  });

  req.on('error', (e) => {
    console.error (`Request failed with message: ${e.message}`)
  })
  
  req.end();
  return eventEmitter.on('done', eventHandler);
}

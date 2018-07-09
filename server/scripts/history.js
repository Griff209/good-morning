const http = require('http');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const today = {
  births: null,
  events: null,
};

module.exports.today = today;
module.exports.getHistory = getHistory;

function getHistory(callback) {
  let options = {
    hostname: 'history.muffinlabs.com',
    port: 80,  
    path: '/date', 
    method: 'GET',
  }
  apiCall(options);
  return eventEmitter.on('done', callback);
}

function apiCall(options) {
  let body = ''
  let req = http.request(options, (res) => {
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      console.log(`Request completed with code ${req.res.statusCode}`);
      processData(body);
    });
  });

  req.on('error', (e) => {
    console.error (`Data not retrieved: ${e.message}`)
  })

  req.end();
}

function processData(JSONbody) {
  let info = JSON.parse(JSONbody).data;
  today.births = info.Births;
  today.events = info.Events;
  console.log('Data processed');
  eventEmitter.emit('done')
} 

const http = require('http');
const hostname = 'history.muffinlabs.com';
const path = '/date';
const today = {};
 
(function() {
  getData();
  console.log(today); 
})();

function getData() {
  var body = ''
  
  let options = {
    hostname,
    port: 80,  
    path, 
    method: 'GET',
  }
  
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
} 
// dependancies
var static = require('node-static');

var config = require('../scripts/config.json');

var file = new static.Server('./build', {
    'cache': 0,
    'headers': {
        'Access-Control-Allow-Origin': '*'
    }
});

console.log("serving");

// https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
var options = {
    key: '~/.localhost-ssl/Certificates.pem',
    cert: '~/.localhost-ssl/localhost.cer'
};

require('https').createServer(options, function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(config.local.port);

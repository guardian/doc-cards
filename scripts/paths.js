// dependancies
var readlineSync = require('readline-sync');
var colors = require('colors');

// data
var documentaries = require('../src/documentaries.json');
var config = require('../scripts/config.json');

var arrayOfDocumentaries = [];

for (var i = 0; i < documentaries.length; i++) {
    arrayOfDocumentaries.push(documentaries[i].title);
}

var selectedDocumentary = readlineSync.keyInSelect(arrayOfDocumentaries, 'What documentary do ya wanna know about?');

// console.log('Thrasher'.rainbow.bold.underline.inverse);
// console.log('Local: '.bold.yellow + returnPath('local', 'thrasher'));
// console.log('Remote: '.bold.green + returnPath('remote', 'thrasher'));

console.log('Header'.rainbow.bold.underline.inverse);
console.log('Local: '.bold.yellow + returnPath('local', 'header'));
console.log('Remote: '.bold.green + returnPath('remote', 'header'));

console.log('\nCard'.rainbow.bold.underline.inverse);
console.log('Local: '.bold.yellow + returnPath('local', 'snap'));
console.log('Remote: '.bold.green + returnPath('remote', 'snap'));

function returnPath(env, type) {
    return documentaries[selectedDocumentary].url + '?gu-snapType=json.html&gu-snapUri=' + encodeURIComponent(config[env].url + (env == 'local' ? ":" + config.local.port : "/" + config.remote.path) + "/" + type + "/" + documentaries[selectedDocumentary].handle + '/source.json') + '&gu-headline=' + encodeURIComponent(documentaries[selectedDocumentary].title) + '&gu-trailText=' + encodeURIComponent(documentaries[selectedDocumentary].description);
}

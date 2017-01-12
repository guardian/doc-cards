// dependancies
var readlineSync = require('readline-sync');
var colors = require('colors');

// data
var podcasts = require('../src/documentaries.json');
var config = require('../scripts/config.json');

var arrayOfPodcasts = [];

for (var i = 0; i < podcasts.length; i++) {
    arrayOfPodcasts.push(podcasts[i].title);
}

var selectedPodcast = readlineSync.keyInSelect(arrayOfPodcasts, 'What documentary do ya wanna know about?');

console.log('Thrasher'.rainbow.bold.underline.inverse);
console.log('Local: '.bold.yellow + returnPath('local', 'thrasher'));
console.log('Remote: '.bold.green + returnPath('remote', 'thrasher'));

console.log('\nCard'.rainbow.bold.underline.inverse);
console.log('Local: '.bold.yellow + returnPath('local', 'snap'));
console.log('Remote: '.bold.green + returnPath('remote', 'snap'));

function returnPath(env, type) {
    return podcasts[selectedPodcast].url + '?gu-snapType=json.html&gu-snapUri=' + encodeURIComponent(config[env].url + (env == 'local' ? ":" + config.local.port : "/" + config.remote.path) + "/" + type + "/" + podcasts[selectedPodcast].handle + '/source.json') + '&gu-headline=' + encodeURIComponent(podcasts[selectedPodcast].title) + '&gu-trailText=' + encodeURIComponent(podcasts[selectedPodcast].description);
}

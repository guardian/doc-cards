// dependancies
var handlebars = require('handlebars');
var fs = require('fs');
var mkpath = require('mkpath');
var ncp = require('ncp').ncp;

// Define what we're building
var snapTemplates = ['thrasher', 'snap', 'header', 'embed'];
var documentaries = require('../src/documentaries.json');

// Build
generateHomePage();
copyImages();
for (var i = 0; i < snapTemplates.length; i++) {
    for (var j = 0; j < documentaries.length; j++) {
        generate(snapTemplates[i], documentaries[j]);
    }
}

function generate(template, data) {

    var jsonFile = fs.readFileSync('src/templates/html.json', 'utf8');
    var htmlFile = fs.readFileSync('src/templates/'+template+'.html', 'utf8');
    var cssFile = fs.readFileSync('build/css/'+template+'.css', 'utf8');


    var htmlTemplate = handlebars.compile(htmlFile);
        data.css = cssFile.replace(/handle/g, data.handle);
        data.html = JSON.stringify(htmlTemplate(data), null);

    var htmlPage = htmlTemplate(data);

    var jsonTemplate = handlebars.compile(jsonFile);
    var json = jsonTemplate(data);


    var path = 'build/'+template+'/' + data.handle;
    mkpath(path, function() {
        fs.writeFile(path + '/source.json', json);
    });

    mkpath(path, function() {
        fs.writeFile(path + '/index.html', htmlPage);
    });

}

function generateHomePage() {
    var homeHtml = fs.readFileSync('src/templates/index.html', 'utf8');
    var htmlTemplate = handlebars.compile(homeHtml);

    fs.writeFile('build/index.html', htmlTemplate(documentaries));
}

function copyImages() {
    copy('src/posters', 'build/posters', "Posters copied");
    copy('src/headers', 'build/headers', "Headers copied");
}

function copy(location, destination, message) {
    mkpath(destination, function() {
        ncp(location, destination, function(err) {
            if(err) {
                console.log(err);
            }
            console.log(message);
        });
    });
}

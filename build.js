#!/usr/bin/env node

var fs = require('fs-extra'),
    path = require('path'),
    ejs = require('ejs'),
    marked = require('marked');


// compile the src/template.ejs file
var template = ejs.compile(fs.readFileSync('src/template.ejs').toString());

// render each post to the build folder
var posts = fs.readdirSync('./posts');
posts.forEach(function(file) {
    var baseName =  path.basename(file, '.md');
    var filePath = path.join('posts', file);
    var destPath = path.join('build', baseName + '.html');

    var markdown = marked(fs.readFileSync(filePath).toString());
    var html = template({ content: markdown });

    fs.writeFileSync(destPath, html);
});


// render src/index.ejs
var filePath = './src/index.ejs';
var destPath = './build/index.html';
var html = ejs.render(fs.readFileSync(filePath).toString(), {posts: posts});
fs.writeFileSync(destPath, html);

// copy over assets

fs.copySync('src/css', 'build/css');
fs.copySync('src/img', 'build/img');
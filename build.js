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
    var html = template({
        content: markdown,
        title: baseName.replace(/[-_]/g, " ")
    });

    fs.writeFileSync(destPath, html);
});


// render src/index.ejs to build/index.html
var filePath = './src/index.ejs';
var destPath = './build/index.html';
var html = ejs.render(fs.readFileSync(filePath).toString(), {

    // convert ['name.md', 'name-two.md'] to
    // [
    //  { title: 'name', raw: 'name.html' },
    //  { title: 'name two', raw: 'name-two.html' }
    // ]
    posts: posts.map(function(name) {
        var baseName = path.basename(name, '.md');
        return {
            title: baseName.replace(/[-_]/g, " "),
            raw: baseName + '.html'
        }
    })
});
fs.writeFileSync(destPath, html);

// copy over assets
fs.copySync('src/css', 'build/css');
fs.copySync('src/img', 'build/img');

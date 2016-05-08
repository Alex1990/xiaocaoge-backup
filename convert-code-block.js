var fs = require('fs');
var path = require('path');

var dir = path.normalize(process.argv[2] || '.');
var files = fs.readdirSync(dir);

var file;
var content;

for (var i = 0, len = files.length; i < len; i++) {
  if (path.extname(files[i]) === '.md') {
    file = path.join(dir, files[i]);
    content = fs.readFileSync(file, { encoding: 'utf8' });
    fs.writeFileSync(file, standardize(content));
  }
}

function standardize(content) {
  var re = /```.*?(\n[\s\S]*?)\n```/g;

  return content.replace(re, function(match, s1) {
    return s1.replace(/\n/g, '\n    ').slice(1);
  });
}

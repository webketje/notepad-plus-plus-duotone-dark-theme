var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var Handlebars = require('handlebars');
var themes = require('./vscode-duotone-dark/src/themes.js');
var template = Handlebars.compile(fs.readFileSync('./theme.xml', 'utf-8'));

var meta = {
  releaseDate: new Date().toISOString().split('T')[0]
};

for (name in themes) {
  var data = themes[name];
  Object.assign(data, meta);
  Object.keys(data).forEach(key => {
    data[key] = data[key].replace('#', '').toUpperCase();
  });
  data.NAME = name;
  fs.writeFileSync(path.join('dist', `DuoTone Dark ${name}.xml`), template(data));
  fs.writeFileSync(path.join('C:\\Workdir\\MyApps\\Notepad++\\themes', `DuoTone Dark ${name}.xml`), template(data));
}

if (process.argv[2] === '--zip') {
  exec('"%programFiles%\\7-Zip\\7z.exe" a dist\\Notepad++_DuoTone-Dark-themes.7z dist\\*.xml', (error, stdout, stderr) => {
    if (!error) {
      console.log('Finished creating 7zip archive in dist folder');
    } else {
      console.error(error);
    }
  });
  exec('"%programFiles%\\7-Zip\\7z.exe" a dist\\Notepad++_DuoTone-Dark-themes.zip dist\\*.xml', (error, stdout, stderr) => {
    if (!error) {
      console.log('Finished creating Zip archive in dist folder');
    } else {
      console.error(error);
    }
  });
}
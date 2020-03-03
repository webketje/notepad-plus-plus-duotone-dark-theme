var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var Handlebars = require('handlebars');
var themes = require('./vscode-duotone-dark/src/themes.js');
var template = Handlebars.compile(fs.readFileSync('./theme.xml', 'utf-8'));
var meta = {
  releaseDate: new Date().toISOString().split('T')[0],
};
function writeThemesXML(themes, dest) {
  for (name in themes) {
    var data = themes[name];
    Object.assign(data, meta);
    Object.keys(data).forEach(key => {
      data[key] = data[key].replace('#', '').toUpperCase();
    });
    // overwrite NAME which is uppercased, with theme object key = regular case
    data.NAME = name;
    fs.writeFileSync(
      path.join(dest || 'dist', `DuoTone Dark ${name}.xml`),
      template(data)
    );
  }
}

function writeUDLs(themes, udls, dest) {
  for (name in themes) {
    var data = themes[name];
    Object.assign(data, meta);
    Object.keys(data).forEach(key => {
      data[key] = data[key].replace('#', '').toUpperCase();
    });
    // overwrite NAME which is uppercased, with theme object key = regular case
    data.NAME = name;

    udls.forEach(function(lang) {
      var template = Handlebars.compile(
        fs.readFileSync(
          './userDefineLangs/userDefinedLang-' + lang + '.xml',
          'utf-8'
        )
      );
      fs.writeFileSync(
        path.join(
          dest || 'dist',
          `userDefinedLang-${lang}_DuoTone Dark ${name}.xml`
        ),
        template(data)
      );
    });
  }
}

function zip(ext) {
  var output = 'Notepad++_DuoTone-Dark-themes';
  var exe = '"%programFiles%\\7-Zip\\7z.exe"';
  exec(
    `cd dist && ${exe} a -aoa ${output}.${ext} *.xml`,
    (error, stdout, stderr) => {
      if (!error) {
        console.log(`Finished creating ${ext} archive in dist folder`);
      } else {
        console.error(error);
      }
    }
  );
}

if (process.argv[2] === '--test') {
  writeThemesXML(themes, path.join(process.env.NPP_PATH, 'themes'));
  writeUDLs(
    themes,
    ['markdown', 'Dockerfile'],
    path.join(process.env.NPP_PATH, 'userDefineLangs')
  );
} else {
  writeThemesXML(themes);
  writeUDLs(themes, ['markdown', 'Dockerfile']);

  if (process.argv[2] === '--zip') {
    zip('zip');
    zip('7z');
  }
}

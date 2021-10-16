// minify.js
// var Terser = require("terser");
const { minify } = require("terser");
const fse = require('fs-extra');

var fs = require("fs");
var path = require("path");

function getAllFiles(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
    }
  });

  return arrayOfFiles.filter(path => path.match(/\.js$/));
}

async function minifyFiles(filePaths) {
  fs.rmdirSync('.\\export\\assets', { recursive: true });
  fs.rmdirSync('.\\export\\node_modules', { recursive: true });

  try {
    fs.unlinkSync('.\\export\\changelog.html', (err) => console.log('deleted'));
  } catch (err) {

  }
  try {
    fs.unlinkSync('.\\export\\gameover.html', (err) => console.log('deleted'));
  } catch (err) {

  }
  try {
    fs.unlinkSync('.\\export\\menu.html', (err) => console.log('deleted'));
  } catch (err) {

  }
  try {
    fs.unlinkSync('.\\export\\play.html', (err) => console.log('deleted'));
  } catch (err) {

  }
  try {
    fs.unlinkSync('.\\export\\start.html', (err) => console.log('deleted'));
  } catch (err) {

  }
  try {
    fs.unlinkSync('.\\export\\victory.html', (err) => console.log('deleted'));
  } catch (err) {

  }
  try {
    fs.unlinkSync('.\\export\\story.html', (err) => console.log('deleted'));
  } catch (err) {

  }

  if (!fs.existsSync('.\\export\\assets')) {
    fs.mkdirSync('.\\export\\assets');
  }

  if (!fs.existsSync('.\\export\\assets\\js')) {
    fs.mkdirSync('.\\export\\assets\\js');
  }

  filePaths.forEach(async filePath => {
    console.log(filePath);
    var filecontent = fs.readFileSync(filePath, "utf8");
    // console.log(filecontent);
    var result = await minify(filecontent);
    // console.log(result.code);

    let path = filePath.substring(0, filePath.indexOf('assets\\js'));
    path += 'export\\assets\\js\\';
    path += filePath.substring(filePath.indexOf('\\js\\') + 4, filePath.length);

    console.log('export path: ' + path);

    fs.writeFileSync(
      path,
      result.code
    );
  });

  let srcDir = '.\\assets\\css';
  let destDir = '.\\export\\assets\\css';

  console.log(srcDir);
  console.log(destDir);

  // To copy a folder or file  
  fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
    if (err) {
      console.error('Failed copy');
      console.error(err);
    } else {
      console.log("success!");
    }
  });

  srcDir = '.\\assets\\fonts';
  destDir = '.\\export\\assets\\fonts';

  console.log(srcDir);
  console.log(destDir);

  // To copy a folder or file  
  fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
    if (err) {
      console.error('Failed copy');
      console.error(err);
    } else {
      console.log("success!");
    }
  });

  srcDir = '.\\assets\\images';
  destDir = '.\\export\\assets\\images';

  console.log(srcDir);
  console.log(destDir);

  // To copy a folder or file  
  fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
    if (err) {
      console.error('Failed copy');
      console.error(err);
    } else {
      console.log("success!");
    }
  });

  srcDir = '.\\assets\\maps';
  destDir = '.\\export\\assets\\maps';

  console.log(srcDir);
  console.log(destDir);

  // To copy a folder or file  
  fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
    if (err) {
      console.error('Failed copy');
      console.error(err);
    } else {
      console.log("success!");
    }
  });

  srcDir = '.\\assets\\sound';
  destDir = '.\\export\\assets\\sound';

  console.log(srcDir);
  console.log(destDir);

  // To copy a folder or file  
  fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
    if (err) {
      console.error('Failed copy');
      console.error(err);
    } else {
      console.log("success!");
    }
  });

  srcDir = '.\\node_modules';
  destDir = '.\\export\\node_modules';

  console.log(srcDir);
  console.log(destDir);

  // To copy a folder or file  
  fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
    if (err) {
      console.error('Failed copy');
      console.error(err);
    } else {
      console.log("success!");
    }
  });

  try {
    fse.copySync('gameover.html', '.\\export\\gameover.html')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }

  try {
    fse.copySync('menu.html', '.\\export\\menu.html')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }

  try {
    fse.copySync('play.html', '.\\export\\play.html')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }

  try {
    fse.copySync('start.html', '.\\export\\start.html')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }

  try {
    fse.copySync('victory.html', '.\\export\\victory.html')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }

  try {
    fse.copySync('changelog.html', '.\\export\\changelog.html')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }

  try {
    fse.copySync('story.html', '.\\export\\story.html')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

const files = getAllFiles("./assets/js");
minifyFiles(files);
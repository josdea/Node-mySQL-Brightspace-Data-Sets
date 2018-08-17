var path = require('path');
var fs = require('fs');

var AdmZip = require('adm-zip');

function fromDir(startPath, filter) {
  //console.log('Starting from dir '+startPath+'/');
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  let files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i]);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter); //recurse
    }
    else if (filename.indexOf(filter) >= 0) {
      unzip(filename);
      console.log('-- found: ', filename);
    };
  };
};

fromDir('./data/zip', '.zip');

function unzip(zipfilename){
  let zip = new AdmZip(zipfilename);
  let zipEntries = zip.getEntries(); // an array of ZipEntry records

  //zipEntries.forEach(function (zipEntry) {
    //console.log(zipEntry.toString()); // outputs zip entries information
  //});

  zip.extractAllTo(/*target path*/"./data/csv", /*overwrite*/true);

}
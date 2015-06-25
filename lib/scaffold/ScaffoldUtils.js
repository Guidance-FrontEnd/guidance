var fs = require('fs');

var ScaffoldUtils = {
  dirExists : function(path, callback){
    fs.lstat(path, function(err, stats){
      callback(!err && stats.isDirectory());
    });
  },
  copyFile : function(fromPath, toPath, callback){
    fs.readFile(fromPath, function(err, data){
      if (err) {
        console.log('ERROR: ' + err.message);
        process.exit();
      }

      fs.writeFile(toPath, data, function(err){
        if (err) {
          console.log('ERROR: ' + err.message);
          process.exit();
        }

        console.log('- Copied "'+fromPath+'" to "'+toPath+'"');

        if (callback) callback();
      });
    });
  }
};

module.exports = ScaffoldUtils;
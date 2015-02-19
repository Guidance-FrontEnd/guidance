var fs = require('fs');

var ScaffoldUtils = {
  dirExists : function(path, callback){
    fs.lstat(path, function(err, stats){
      callback(!err && stats.isDirectory());
    });
  }
};

module.exports = ScaffoldUtils;
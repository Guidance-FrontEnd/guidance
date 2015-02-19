var fs = require('fs');

var Config = {
  get : function(file, callback){
    var obj;
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        console.log('ERROR - ' + err.message);
        process.exit();
      }
      obj = JSON.parse(data);
      callback(obj);
    });
  },
  save : function(file, data, callback){
    var data = JSON.stringify(data);
    fs.writeFile(file, data, function(err){
      if (err){
        console.log('ERROR - ' + err.message);
        process.exit();
      }
      if (callback) callback();
    })
  }
}

module.exports = Config;
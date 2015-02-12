var path  = require('path'),
    fs    = require('fs');

var ScaffoldInit = {
  run : function(base_path){
    var base_path = base_path.trim();
    if (!base_path.match(/(\\|\/)$/)) base_path += '/';
    base_path = path.normalize(base_path);
    console.log('scaffold init - ' + base_path);
  }

}

module.exports = ScaffoldInit;
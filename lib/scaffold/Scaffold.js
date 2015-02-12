var ScaffoldInit  = require('./ScaffoldInit.js');
var ScaffoldNew   = require('./ScaffoldNew.js');

var Scaffold = {
  init : function(base_path){
    ScaffoldInit.run(base_path);
  },
  
  new : function(obj){
    ScaffoldNew.run(obj);
  }
};

module.exports = Scaffold;
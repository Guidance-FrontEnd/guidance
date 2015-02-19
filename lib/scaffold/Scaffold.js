var ScaffoldInit    = require('./ScaffoldInit.js');
var ScaffoldCreate  = require('./ScaffoldCreate.js');

var Scaffold = {
  init : function(base_path){
    ScaffoldInit.run(base_path);
  },

  create : function(obj){
    ScaffoldCreate.run(obj);
  },

  category : function(category){
    ScaffoldCreate.newCategory(category);
  },

  module : function(module_category, name){
    ScaffoldCreate.newModule(module_category, name);
  },

  font : function(font_name){
    ScaffoldCreate.newFont(font_name);
  }
};

module.exports = Scaffold;
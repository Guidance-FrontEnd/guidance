var question  = require('inquirer'),
    path      = require('path'),
    clc       = require('cli-color'),
    fs        = require('fs');

var Config = require('../config/Config.js');
var ScaffoldUtils = require('./ScaffoldUtils.js');

var ScaffoldCreate = {
  run : function(obj){
    switch (obj){
      case 'category':
        this.newCategory();
        break;
      case 'module':
        this.newModule();
        break;
      case 'font':
        this.newFont();
        break;
      default:
        question.prompt({
          type : 'list',
          name : 'obj',
          message : 'Create new:',
          choices : ['category', 'module', 'font'],
          default: 1
        }, function(answer){
          ScaffoldNew.run(answer.obj);
        });
    }
  },

  newCategory : function(category){
    console.log('Scaffold: new module');
  },

  newModule : function(module_category, name){
    console.log('Scaffold: new module');
  },

  newFont : function(font_name){
    console.log('Scaffold: new font');
  }
};

module.exports = ScaffoldCreate;
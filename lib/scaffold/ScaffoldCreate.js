var question  = require('inquirer'),
    path      = require('path'),
    clc       = require('cli-color'),
    fs        = require('fs');

var Config = require('../config/Config.js');
var ScaffoldBaseStructure = require('./ScaffoldBaseStructure.js');
var ScaffoldBuilder = require('./ScaffoldBuilder.js');
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
          ScaffoldCreate.run(answer.obj);
        });
    }
  },

  newCategory : function(category){
    var guidancePath = path.normalize(process.cwd() + '/' + ScaffoldBaseStructure[0].folder);
    ScaffoldUtils.dirExists(guidancePath, function(exists){
      if (!exists){
        console.log("Guidance folder not found. Run `guidance init`.");
        process.exit();
      } else {
        var inputFolder = guidancePath + '/' + ScaffoldBaseStructure[0].subfolders[2].folder;
        if (category){
          ScaffoldUtils.dirExists( path.normalize(inputFolder + '/' + category), function(exists){
            if (!exists){
              ScaffoldBuilder.buildInside(category, path.normalize(inputFolder), false);
              console.log("New category created: " + category);
            } else {
              console.log("Category " + category + " already exists.");
            }
          });
        } else {
          question.prompt({
            type: 'input',
            name: 'category',
            message: 'Category name:',
            validate: function(input){
              if (input.trim().length){
                return true;
              } else {
                return 'Please enter a category name.';
              }
            }
          }, function(answer){
            ScaffoldCreate.newCategory(answer.category);
          })
        }
      }
    });
  },

  newModule : function(module_category, name){
    console.log('Scaffold: new module');
  },

  newFont : function(font_name){
    console.log('Scaffold: new font');
  }
};

module.exports = ScaffoldCreate;
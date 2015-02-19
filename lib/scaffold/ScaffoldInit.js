var question  = require('inquirer'),
    path      = require('path'),
    clc       = require('cli-color'),
    fs        = require('fs');

var ScaffoldBaseStructure = require('./ScaffoldBaseStructure.js');
var ScaffoldBuilder = require('./ScaffoldBuilder.js');
var ScaffoldUtils = require('./ScaffoldUtils.js');
var Config = require('../config/Config.js');

var ScaffoldInit = {
  run : function(base_path){
    var base_path = base_path.trim();
    if (!base_path.match(/(\\|\/)$/)) base_path += '/';
    base_path = path.normalize(base_path);

    var guidancePath = path.normalize(base_path + '/' + ScaffoldBaseStructure[0].folder);
    ScaffoldUtils.dirExists(guidancePath, function(exists){
      if (!exists){
        ScaffoldUtils.dirExists(base_path, function(exists){
          if (exists){
            console.log("- Initializing guideline on '" + base_path + "'...");
            ScaffoldInit.configAndBuild(base_path);
          } else {
            ScaffoldBuilder.createNotFound(base_path, true, function(){
              console.log("- Initializing guideline on '" + base_path + "'...");
              ScaffoldInit.configAndBuild(base_path);
            });
          }
        });
      } else {
        console.log('- Guidance directory already exists in path. Aborting.');
        process.exit();
      }
    });
  },

  configAndBuild : function(base_path){
    question.prompt({
      type : 'input',
      name : 'outputfolder',
      message : 'Guideline output folder:',
      default : 'guideline'
    }, function(answer){
      ScaffoldBaseStructure[0].subfolders.push({folder:answer.outputfolder, description:'guideline output folder'});
      ScaffoldBuilder.build(base_path, ScaffoldBaseStructure, function(){
        var configPath = base_path + '/' + ScaffoldBaseStructure[0].folder + '/config/';
        Config.save(configPath+'base_structure.json', ScaffoldBaseStructure, function(){
          console.log('Guidance structure built on "' + base_path + '"');
        });
      });
    });
  }
}

module.exports = ScaffoldInit;
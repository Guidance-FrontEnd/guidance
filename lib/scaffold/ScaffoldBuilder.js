var question  = require('inquirer'),
    path      = require('path'),
    fs        = require('fs');

var ScaffoldUtils = require('./ScaffoldUtils.js');

var ScaffoldBuilder = {
  build : function(base_path, structureArray, callback) {
    ScaffoldBuilder.buildInside(structureArray[0].folder, base_path, true, function(){
      var guidanceFolder = path.normalize(base_path + '/' + structureArray[0].folder);
      for (var i=0; i<structureArray[0].subfolders.length; ++i){
        if (i == structureArray[0].subfolders.length-1){
          ScaffoldBuilder.buildInside(structureArray[0].subfolders[i].folder, guidanceFolder, false, function(){
            if (callback) callback();
          });
        } else {
          ScaffoldBuilder.buildInside(structureArray[0].subfolders[i].folder, guidanceFolder, false);
        }
      }
    });
  },

  buildInside : function(folderName, insideOf, askIfNotFound, callback){
    ScaffoldUtils.dirExists(insideOf, function(exists){
      if (exists){
        fs.mkdir(path.normalize(insideOf+'/'+folderName), function(err){
          if (!err){
            console.log('- Created folder "' + folderName + '" inside "' + insideOf + '".');
            if (callback) callback();
          } else {
            console.log('ERROR - '+err.message);
            process.exit();
          }
        });
      } else {
        ScaffoldBuilder.createNotFound(insideOf, askIfNotFound, function(){
          fs.mkdir(path.normalize(insideOf+'/'+folderName), function(err){
            if (!err){
              console.log('- Created folder "' + folderName + '" inside "' + insideOf + '".');
              if (callback) callback();
            } else {
              console.log('ERROR - '+err.message);
              process.exit();
            }
          });
        });
      }
    })
  },

  createNotFound : function(createPath, ask, callback){
    if (ask){
      question.prompt({
        type : 'confirm',
        name : 'allowcreate',
        message : 'Path not found: "' + createPath + '". Create?',
        default : true
      }, function(answer){
        if (answer.allowcreate){
          fs.mkdir(path.normalize(createPath), function(err){
            if (!err){
              console.log('- Created folder "' + insideOf);
              if (callback) callback();
            } else {
              console.log('ERROR - '+err.message);
              process.exit();
            }
          });
        } else {
          console.log('Not allowed by user. Aborting.');
          process.exit();
        }
      });
    } else {
      fs.mkdir(path.normalize(createPath), function(err){
        if (!err){
          console.log('- Created folder "' + insideOf);
          if (callback) callback();
        } else {
          console.log('ERROR - '+err.message);
          process.exit();
        }
      });
    }
  }
};

module.exports = ScaffoldBuilder;
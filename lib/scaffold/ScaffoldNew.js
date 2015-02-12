var question  = require('inquirer'),
    fs        = require('fs');

var ScaffoldNew = {
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

  newCategory : function(){
    console.log('Scaffold: new category');
  },

  newModule : function(){
    console.log('Scaffold: new module');
  },

  newFont : function(){
    console.log('Scaffold: new font');
  }
};

module.exports = ScaffoldNew;
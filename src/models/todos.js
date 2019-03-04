const {model,Schema} = require('mongoose');

const TodosSchema = new Schema({
  title:{type:String, required:true},
  description:{type:String, required:true},
  priority:{type:String,required:true},
  authorID:{type:String,required:true}
});

const Todos = model('todos',TodosSchema);

module.exports = Todos;

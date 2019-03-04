const {model,Schema} = require('mongoose');

const UserSchema = new Schema({
  username:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true}
});

const Users = model('users',UserSchema);

module.exports = Users;
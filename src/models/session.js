const {model,Schema} = require('mongoose');

const TokenSchema = new Schema({
  username:{type:String},
  user_token:{type:String},
  userID:{type:String},
  createdAt: {type:Date,default:Date.now,expires:24*60*60}
});

module.exports = model('Tokens',TokenSchema);
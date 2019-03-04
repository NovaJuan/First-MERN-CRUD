const Tokens = require('../models/session');


const getToken = () =>{
  var newToken = '';
  var chars = "abcdefghijklmnopqrstuvwyz0123456789";
  
  for(var i = 0; i<30;i++){
    newToken += chars.charAt(Math.floor(Math.random()*chars.length));
  }
  
  return newToken;
}


const startSession = async (req,res,user,userID) => {
  const newToken = getToken();
  const freetoken = await Tokens.find({user_token:newToken});
  if(freetoken.length == 0){
    new Tokens({
      username:user,
      user_token:newToken,
      userID:userID
    }).save()
      .then(()=>{
        res.cookie("token", newToken, {maxAge: 360000}); 
        res.json({
          username:user
      });
    })
  }else{
    startSession()
  }
}

module.exports.startSession = startSession;
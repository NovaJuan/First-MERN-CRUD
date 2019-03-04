const {Router} = require('express');
const router = Router();

const {startSession} = require('../controllers/sessionControllers');

const Users = require('../models/users');
const Session = require('../models/session');

router.post('/signup',async(req,res)=>{
  const userEmailValidation = await Users.find({email:req.body.email});
  const userUsernameValidation = await  Users.find({username:req.body.username});

  let authErrors = []

  if(userEmailValidation.length > 0){
    authErrors.push('That email already exists')
  }
  if(userUsernameValidation.length > 0){
    authErrors.push('That username already exists')
  }

  if(userEmailValidation.length == 0 && userUsernameValidation.length == 0){
    const newUser = new Users({
      username:req.body.username,
      email:req.body.email.toLowerCase(),
      password: req.body.password
    });

    newUser.save();

    res.json({status:'User Added'});
  }else{
    res.json({
      errors: authErrors
    });
    authErrors = []
  }
});

router.post('/login',async (req,res)=>{
  const user = await Users.find({username:req.body.username});
  if(user.length > 0){
    if(user[0].password == req.body.password){
      startSession(req,res,user[0].username,user[0]._id)
    }else{
      res.json({
        error:'Password Incorrect'
      });
    }
  }else{
    res.json({
      error:"User don't exist"
    });
  }
});

router.get('/auth/:token',async(req,res)=>{
  const authToken = await Session.find({user_token:req.params.token});
  if(authToken.length > 0){
    res.json({
      username:authToken[0].username,
      userID:authToken[0].userID,
      isLogged:true
    })
  }else{
    res.json({
      username:'',
      userID:'',
      isLogged:false
    })
  } 
})

router.get('/logout',async(req,res)=>{
  await Session.findOneAndDelete({user_token:req.cookies.token})
  res.clearCookie('token');
  res.redirect('/');
})

module.exports = router;
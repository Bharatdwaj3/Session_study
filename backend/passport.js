const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const connection = require('./db');
const User = require('./models/userModel');

const customFields={
    usernameField:'uname',
    passwordField: 'pword',

};

const verifyCallback=(username, password, doneFunc)=>{
   User.findOne({username: username})
    .then((user)=>{
        if(!user){
            return doneFunc(null, false)
        }
        const isValid=validPassword(password, user.hash, user.salt);
        if(isValid){
            return doneFunc(null, user);
        }else{
            return doneFunc(null, false);
        }
    })
}

const strategy=new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done)=>{
    doneFunc(null, user.id);
});

passport.deserializeUser((userId, doneFunc)=>{
    User.findById(userId)
    .then((user)=>{
        done(null, user);
    })
    .catch(err=>done(err))
});

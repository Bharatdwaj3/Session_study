const express = require("express");
const options=require('express');
const mongoose=require('mongoose');
const session=require('express-session');
//const connectDB=require('../db');
const MongoStore = require('connect-mongo');


 var app=express();

const dbString=process.env.MONGO_URI; 
const dbOptions={
    useNewUrlParser: true,
    useUnifiedTopology:true
}

const connection=mongoose.createConnection(dbString, dbOptions);

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const sessionStore=MongoStore.create({
    mongoUrl: dbString,
    collectionName: 'session'
});
 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie:{
        maxAge: 1000*60*60*24
    }
}));

app.get('/',(req, res, next)=>{
    cpnsole.log(req.session);
    res.send('<h1>Boring as hell!!</h1>')
})

app.listen(3000);
const express = require("express");
const cors = require("cors");
const cookieParser =require("cookie-parser");
const passport = require('./passport');

require("dotenv").config();


const connectDB=require('./db');
const tenantRoutes =require("./routes/tenantRoutes");
const pgRoutes =require("./routes/pgRoutes");
const app = express();

const { default: mongoose } = require("mongoose");
require('./passport')(passport);


connectDB();


app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin:'http://localhost:5173' ,
    credentials:true,
}));

const sessionStore=new MongoStore({
    mongooseConnection: connection,
    collection: 'session'
});

const session_secrect=process.env.SESSION_SECRET 

app.use(session({
    secret:`${session_secrect}`,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge :1000*60*60*24
    }
}));

app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Server is ready');
});

app.use('/tenants',tenantRoutes);
app.use('/pg',pgRoutes);


const port = process.env.PORT || 3005;

app.listen(port,()=>{
    console.log(`Serve at http:localhost:${port}`);
});
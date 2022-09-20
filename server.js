const express = require('express');
const path = require('path');
const bodyparser=require("body-parser");
const session = require("express-session");
const {v4:uuidv4 }=require("uuid");
const mongoose = require('mongoose'); 

const router=require('./router')

const app = express();

const port = process.env.PORT||4000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
const mongoAtlasUri =
  "mongodb+srv://xenon_stack_amish:Amish@1234@cluster0.hzjn9ua.mongodb.net/?retryWrites=true&w=majority";
try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}
app.set('view engine','ejs');

app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret: uuidv4(),
    resave:false,
    saveUninitialized:true
}));


app.use('/route',router)


app.get('/',(req,res)=>{
    res.render('base',{title : "Login system"});
})

app.listen(port, ()=>{console.log("lostening to the server on http://localhost:4000")});
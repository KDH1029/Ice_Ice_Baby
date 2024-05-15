const express = require('express');
const app = express();
const port = 8080;

app.listen(port,()=>{
  console.log("port: "+port);
});

const mongoose = require('mongoose');
const url = `mongodb+srv://KDH:4n3g7!WTY_zZVd-@cluster0.sthvvfu.mongodb.net/userDB?retryWrites=true&w=majority&appName=Cluster0`;
const UserModel = require('./models/user');

mongoose
  .connect(url)
  .then(()=>{
    console.info("connected")
  }).catch((err)=>{
    console.log("error: ",err);
  });

app.get('/',(req,res)=>{
  res.send("...");
});

const userInfo = {
  name:"aa",
  history:["1","2","3"],
  pay:20,
}

//register user
app.get('/user',(req,res)=>{
  var newUser = new UserModel(userInfo);
  newUser
    .save()
    .then(models=>{
      res.status(200).json({message: "created"});
    }).catch(err=>{
      console.log(err)
    });
});
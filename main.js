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
    console.log("connected");
  }).catch((err)=>{
    console.log("error: ",err);
  });

app.get('/',(req,res)=>{
  res.send("...");
});
app.get('/test/:params',(req,res)=>{
  console.log(req.params);
  console.log(req.query);
});

// data register
app.get('/user/:id',(req,res)=>{
  var userInfo = {
    id:req.params.id,
    pw:req.query.pw??"null"
  };
  var newUser = new UserModel(userInfo);
  newUser
    .save()
    .then(data=>{
      res.status(200).send(userInfo);
    }).catch(err=>{
      console.log(err);
    });
});

// data inquiry
app.get('/read',(req,res)=>{
  UserModel
    .find()
    .then(data=>{
      res.status(200).send(data);
    })
    .catch(err=>{
      res.status(500).send(err);
    });
});

// data update
// /update?id="id"&new="new id"
app.get('/update',(req,res)=>{
  UserModel
    .findOneAndUpdate({id:req.query.id},{id:req.query.new})
    .then(data=>{
      res.status(200).send(data);
    })
    .catch(err=>{
      res.status(500).send(err);
    });
});

// delete data
app.get('/delete/:id',(req,res)=>{
  UserModel
    .remove({id:req.params.id})
    .then(data=>{
      res.status(200).send(data);
    })
    .catch(err=>{
      res.status(500).send(err);
    });
});
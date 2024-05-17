/**
 * @requires express
 * @requires mongoose
 */

const express = require('express');
const app = express();
const port = 8080;

app.listen(port,()=>{
  console.log("port: "+port);
});

const db = require('./modules/mongo')
const event = require('./modules/event')

// register data
app.get('/create',(req,res)=>{
  var userInfo = {
    id:req.query.id??Math.floor(Math.random()*10000)/100,
    pw:req.query.pw??"null",
    pay:Math.floor(Math.random()*10000)/100
  };
  db.create(userInfo)
    .then(data=>{
      console.log(`db.create(${userInfo}): `,data);
      res.status(200).send(data);
    })
    .catch(err=>{
      console.log("error: ",err);
      res.status(500).send(err);
    });
});
// search data
app.get('/search',(req,res)=>{
  db
    .find(req.query.q)
    .then(data=>{
      console.log(`db.search(${req.query.q}): `,data);
      res.status(200).send(data);
    })
    .catch(err=>{
      console.log("error: ",err);
      res.status(500).send(err);
    });
});
// data update
app.get('/update',(req,res)=>{
  db
    .update(JSON.parse(req.query.query),JSON.parse(req.query.obj))
    .then(data=>{
      console.log(`db.update(${req.query.query},${req.query.obj}): `,data);
      res.status(200).send(data);
    })
    .catch(err=>{
      console.log("error: ",err);
      res.status(500).send(err);
    });
});
// delete data
app.get('/delete/:query',(req,res)=>{
  db
    .del(JSON.parse(req.params.query))
    .then(data=>{
      console.log(`db.del(${req.params.query}): `,data);
      res.status(200).send(data);
    })
    .catch(err=>{
      console.log("error: ",err);
      res.status(500).send(err);
    });
});

app.get('/rank',(req,res)=>{
  event.rank(3)
  .then(data=>{
    console.log(`db.rank(): `,data);
    res.status(200).send(data);
  })
  .catch(err=>{
    console.log("error: ",err);
    res.status(500).send(err);
  });
})
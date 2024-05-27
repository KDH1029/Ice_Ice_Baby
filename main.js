/**
 * @requires express
 * @requires mongoose
 * @requires body-parser
 */

const express = require('express');
const app = express();
const port = 8080;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port,()=>{
  console.log("port: "+port);
});

const user = require('./modules/user');
const sales = require('./modules/sales');
const event = require('./modules/event');

// register data
app.post('/create',(req,res)=>{
  console.log(req.body)
  var userInfo = {
    id:req.body.id??Math.floor(Math.random()*10000)/100,
    pw:req.body.pw??"null",
    pay:req.body.pay??Math.floor(Math.random()*10000)/100
  };
  user
    .create(userInfo)
    .then(data=>{
      console.log(`user.create(${JSON.stringify(userInfo)}): `,data);
      res.status(200).send(data);
    })
    .catch(err=>{
      console.log("error: ",err);
      res.status(500).send(err);
    });
});
// search data
app.get('/search',(req,res)=>{
  user
    .find(req.query.q)
    .then(data=>{
      console.log(`user.search(${req.query.q}): `,data);
      res.status(200).send(data);
    })
    .catch(err=>{
      console.log("error: ",err);
      res.status(500).send(err);
    });
});
// data update
app.get('/update',(req,res)=>{
  user
    .update(JSON.parse(req.query.query),JSON.parse(req.query.obj))
    .then(data=>{
      console.log(`user.update(${req.query.query},${req.query.obj}): `,data);
      res.status(200).send(data);
    })
    .catch(err=>{
      console.log("error: ",err);
      res.status(500).send(err);
    });
});
// delete data
app.get('/delete/:query',(req,res)=>{
  user
    .del(JSON.parse(req.params.query))
    .then(data=>{
      console.log(`user.del(${req.params.query}): `,data);
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
    console.log(`user.rank(): `,data);
    res.status(200).send(data);
  })
  .catch(err=>{
    console.log("error: ",err);
    res.status(500).send(err);
  });
})

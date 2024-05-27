/**
 * @requires express
 * @requires mongoose
 * @requires body-parser
 */

const express = require('express');
const app = express();
const port = 8080;

// may have potential security issues.
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fs = require('fs');
const errorList = JSON.parse(fs.readFileSync('error.json'));

app.listen(port, () => {
  console.log("port: " + port);
});

const user = require('./modules/user');
const sales = require('./modules/sales');
const event = require('./modules/event');

// register data
app.post('/createAccount', (req, res) => {
  console.log(req.body)
  var userInfo = {
    id: req.body.id,
    pw: req.body.pw,
    username: req.body.username
  };
  user
    .create(userInfo)
    .then(data => {
      console.log(`user.create(${JSON.stringify(userInfo)}): `, data);
      res.status(200).send(data);
    })
    .catch(err => {
      console.log("error: ", err);
      if (errorList.hasOwnProperty(err.code))
        res.status(500).send({ error: errorList[err.code] });
      else
        res.status(500).send({ error: "unknown error." });
    });
});
// search data
app.post('/searchAccount', (req, res) => {
  user
    .search(req.body.id, req.body.pw)
    .then(data => {
      console.log(`user.search(${req.body.id},${req.body.pw}): `, data);
      res.status(200).send(data);
    })
    .catch(err => {
      console.log("error: ", err);
      res.status(500).send(err);
    });
});
// data update
app.post('/updateAccount', (req, res) => {
  user
    .update(req.body.id, req.body.pw, JSON.parse(req.body.query))
    .then(data => {
      console.log(`user.update(${req.body.id},${req.body.query}): `, data);
      res.status(200).send(data);
    })
    .catch(err => {
      console.log("error: ", err);
      res.status(500).send(err);
    });
});
// delete data
app.post('/deleteAccount', (req, res) => {
  user
    .del(req.body.id, req.body.pw)
    .then(data => {
      console.log(`user.del(${req.body.id}): `, data);
      res.status(200).send(data);
    })
    .catch(err => {
      console.log("error: ", err);
      res.status(500).send(err);
    });
});

app.get('/rank', (req, res) => {
  event.rank(3)
    .then(data => {
      console.log(`user.rank(): `, data);
      res.status(200).send(data);
    })
    .catch(err => {
      console.log("error: ", err);
      res.status(500).send(err);
    });
})

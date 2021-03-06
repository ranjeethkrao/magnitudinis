const async = require("async");
const firebase = require('firebase-admin');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();


// Initialize the app with a service account, granting admin privileges
var serviceAccount = require('../../firebase-auth/interactiveapp7-b4dba-firebase-adminsdk-bqv2d-6a1fe5b960.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://interactiveapp7-b4dba.firebaseio.com'
});

var db = firebase.database();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/users', async (req, res) => {
  var ref = db.ref("users");
  let result = [];
  ref.on("value", function (snapshot) {
    Object.keys(snapshot.val()).forEach(key => {
      let user = snapshot.val()[key];
      user.uuid = key;
      result.push(user);
    })
    res.send(result);

  });
});


app.get('/gusers', async (req, res) => {
  var ref = db.ref("users");
  let result = [];
  ref.on("value", function (snapshot) {
    Object.keys(snapshot.val()).forEach(key => {
      let user = snapshot.val()[key];
      if (user.userType === 'general') {
        user.uuid = key;
        if (!user.follows) user.follows = [];
        result.push(user)
      }
    })
    res.send(result);
  });
});

app.post('/changes', async (req, res) => {
  let updates = req.body.changes;


  var updateUser = function (update, callback) {
    var ref = db.ref("users/" + update.uuid);

    ref.update({
      follows: update.newValue
    }).then(() => {
      return callback();
    }).catch((err) => {
      return callback(err);
    });
  }

  async.forEach(updates, updateUser, function (error) {
    if (error) {
      res.send({ code: -1, message: 'Error updating records.' })
    } else {
      res.send({ code: 0, message: 'Update successful' })
    }
  })
});


app.listen(3000, function () {
  console.log('Server started on http://localhost:3000');
});
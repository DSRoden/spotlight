'use strict';

var bcrypt  = require('bcrypt'),
    // request = require('request'),
    // path    = require('path'),
    // AWS     = require('aws-sdk'),
    crypto  = require('crypto'),
    pg      = require('../postgres/manager');

function User(obj){
  this.username = obj.username;
  this.email = obj.email;
  this.phone = obj.phone || null;
}

User.register = function(obj, cb){
  var user = new User(obj);
  user.password = bcrypt.hashSync(obj.password, 8);
  crypto.randomBytes(48, function(ex, buf){
    user.token = buf.toString('hex');
    pg.query('insert into users (username, password, email, phone, token) values ($1, $2, $3, $4, $5)', [user.username, user.password, user.email, user.phone, user.token], cb);
  });
};

User.login = function(obj, cb){
  pg.query('select * from users where username = $1 limit 1', [obj.username], function(err, results){
    if(err || !results.rowCount){return cb();}
    var isAuth = bcrypt.compareSync(obj.password, results.rows[0].password);
    if(!isAuth){return cb();}
    var user = results.rows[0];
    delete user.password;
    cb(user);
  });
};


//if the user is the administrator run lottery
User.runLottery = function(id, cb){
  console.log(id);
  if(id !== 1) {return cb(null);}
  pg.query('select id from users', [], function(err, results){
    console.log(results.rows);
    var lotteryNum = Math.floor(Math.random() * (results.rows.length -1) + 1),
        winner = results.rows[lotteryNum];
    pg.query('select * from users where id= $1', [winner.id], function(err, results2){
      console.log(err);
      console.log(results2);
      cb(results2.rows[0]);
    });
  });
};

//ensure that any person trying to broadcast to the public is actually the spotlight
User.secureSpotlight = function(id, cb){
  console.log(id);
  pg.query('select * from days where user_id = $1', [id], function(results){
    console.log(results);
  });
};

//select winner: set current field on all days to false, then create new day with a current field true
//add user_id of the winner
User.selectWinner = function(authId, winnerId, cb){
  console.log('getting authId', authId);
  authId = authId.id;
  if(authId !== 1) {return cb(null);}
  console.log('winnerId from models', winnerId);
  pg.query('select set_winner($1)', [winnerId.id], function(err, results){
    pg.query('select * from users where id= $1', [winnerId.id], function(err2, results2){
    console.log(results2);
    cb(err, results2.rows[0]);
    });
  });
};

//
// function randomUrl(url, cb){
//   var ext  = path.extname(url);
//
//   crypto.randomBytes(48, function(ex, buf){
//     var token  = buf.toString('hex'),
//         file   = token + '/avatar' + ext,
//         avatar = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + file;
//     cb(file, avatar, token);
//   });
// }
//
// function download(url, file, cb){
//   var s3 = new AWS.S3();
//
//   request({url: url, encoding: null}, function(err, response, body){
//     var params = {Bucket: process.env.AWS_BUCKET, Key: file, Body: body, ACL: 'public-read'};
//     s3.putObject(params, cb);
//   });
// }

module.exports = User;

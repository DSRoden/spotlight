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


User.validateSpotlight = function(auth, password, cb){
  //console.log('auth', auth);
  //console.log('password', password);
  pg.query('select * from users where username = $1 limit 1', [auth.username], function(err, results){
    if(err || !results.rowCount){return cb();}
    var user = results.rows[0];
    pg.query('select * from days order by created_at desc limit 1', [], function(err2, results2){
      /*jshint camelcase: false */
      var dayUserId = results2.rows[0].user_id,
          todaysPassword = results2.rows[0].password,
          userPass = password.password,
          validated =  bcrypt.compareSync(password.password, todaysPassword);
      //console.log('user id', user.id);
      //console.log('day user_id', dayUserId);
      //console.log('password user has provided', password.password);
      //console.log('password day has provided', todaysPassword);
      //console.log('vliadation process',  bcrypt.compareSync(password.password, todaysPassword));

      if(validated && dayUserId === user.id){
        pg.query('UPDATE users SET spotlightpass = $1 WHERE id = $2', [userPass, dayUserId], function(err, results3){
          //console.log('results3 coming back after spotlightPass', err);
          cb({validated : true});
        });
      } else {
        //console.log('not validated');
        return cb();}
    });
  });
};



User.spotlightCheck = function(auth, cb){
  //console.log('spotlight check auth>>>>', auth);
  pg.query('select * from days order by created_at desc limit 1', [], function(err, result){
    pg.query('select * from users where id = $1', [auth.id], function(err2, results2){
      //console.log('err from query in spotlightCheck', err);
      /*jshint camelcase: false */
      var dayPass = result.rows[0].password,
          currentSpotlightId = result.rows[0].user_id,
          confirmed = (currentSpotlightId === auth.id) ? true : false,
          validated, userPass;

          if(results2.rows[0].spotlightpass !== null){
            /*jshint -W030 */
            userPass = results2.rows[0].spotlightpass,
            validated = bcrypt.compareSync(userPass, dayPass);
          }

          console.log('userpass>>>>', userPass);
          console.log('daysPass>>>>', dayPass);
          console.log('is it being validated on spotlight check', validated);
      cb(null, {confirmed : confirmed, validated :validated});
    });
  });
};

//if the user is the administrator run lottery
User.runLottery = function(id, cb){
  //console.log(id);
  if(id !== 1) {return cb(null);}
  pg.query('select id from users', [], function(err, results){
  //  console.log(results.rows);
    var lotteryNum = Math.floor(Math.random() * (results.rows.length -1) + 1),
        winner = results.rows[lotteryNum];
    pg.query('select * from users where id= $1', [winner.id], function(err, results2){
    //  console.log(err);
    //  console.log(results2);
      cb(results2.rows[0]);
    });
  });
};

//ensure that any person trying to broadcast to the public is actually the spotlight
User.secureSpotlight = function(id, cb){
  //console.log(id);
  pg.query('select * from days order by created_at desc limit 1', [], function(err, results){
    //console.log('going into days to find most recent', results);
   /*jshint camelcase: false */
    if(results.rows[0].user_id !== id){return cb();}
    pg.query('select * from users where id= $1', [id], function(err, results2){
      var validated = bcrypt.compareSync(results2.rows[0].spotlightpass, results.rows[0].password);
      if(!validated){return cb();}
      //console.log('user passing security checks for messages');
      cb({dayId: results.rows[0].id});

    });
  });
};

//select winner: set current field on all days to false, then create new day with a current field true
//add user_id of the winner
User.selectWinner = function(authId, winnerId, cb){
  //console.log('getting authId', authId);
  //make sure only the administrator can selectWinner
  authId = authId.id;
  if(authId !== 1) {return cb(null);}
  //create password for the day
  var todaysPassword = makePassword(),
      //hash the password
      hashedPassword = bcrypt.hashSync(todaysPassword, 8);
  //find winner's info by id
  pg.query('select * from users where id= $1', [winnerId.id], function(err, results){
    //console.log(results);
   // console.log(results.rows[0]);
    var user = results.rows[0],
    //notify the winner via email
        message = 'You have been selected as today\'s Spotlight. You will be prompted for a password if you open SPOTLIGHT. To claim the spotlight please enter the following password: ' + todaysPassword +' You will have twenty minutes to claim your spot before the lottery runs again. The whole world wide web is your stage!' ;
    sendEmail('daniel.s.roden@gmail.com', user.email, message, function(err, resE){
    //  console.log('email error >>>>>>>>>>>>>>>>>', err);
    //  console.log('email res >>>>>>>>>>>>>>>>>>', resE);
    });

    //if user has phone send text notification
    if(user.phone !== null){
      sendText(user.phone, 'Your are the Spotlight! Sign into the app and enter this password into the prompt in the next 20 minutes to claim your spot: ' + todaysPassword, function(err, resE){
        //  console.log('text error >>>>>>>>>>>>>>>>>', err);
        //  console.log('text res >>>>>>>>>>>>>>>>>>', resE);
      });
    }
    // set day with winner and hashed password and all active as default false
    pg.query('select set_winner($1, $2)', [winnerId.id, hashedPassword], function(err1, results2){
      cb(err1, user);
    });
  });
};

//////PRIVATE HELPER FUNCTIONS/////

//create password
function makePassword(){
  var password = '',
      possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for(var i=0; i < 5; i++){
    password += possible.charAt(Math.floor(Math.random() * possible.length));
  }
    return password;
}

//send a notification email
function sendEmail(sender, to, body, cb){
  if(!sender || !to){return cb();}

  var apiKey  = process.env.MGKEY,
  domain  = process.env.MGDOM,
  Mailgun = require('mailgun-js'),
  mg      = new Mailgun({apiKey: apiKey, domain: domain}),
  subject = 'You\'re in the Spotlight!',
  data    = {from:sender, to:to, subject:subject, html:body};

  mg.messages().send(data, cb);
}


// send text
function sendText(to, body, cb){
  if(!to){return cb();}

  var accountSid = process.env.TWSID,
  authToken  = process.env.TWTOK,
  from       = process.env.FROM,
  client     = require('twilio')(accountSid, authToken);

  client.messages.create({to:to, from:from, body:body}, cb);
}



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

const express = require('express');
const app = express();

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const config = require('./config.js')
const mongoURL = config.MONGOLAB_URI;
console.log(mongoURL);


const PORT = 8080;

const request = require('request');
const queryString = require('query-string');


app.use('/public', express.static(`${__dirname}/public`));


app.get('/api/card', (req, res) => {

  const location = req.query.location;

  MongoClient.connect(mongoURL, (err, db) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`connection established with: ${mongoURL}`);

      const places = db.collection('places');

      const Access = (db, callback) => {
          places.findOne({'location':location}).then(singleNode=>{
            if (singleNode) {
              const people=singleNode.going.length;
              res.json({
                'going':people
              })
            } else {
              res.json({
                'going':0
              })
            }


          })

      };

      Access(db, () => {
        db.close();
      });
    }
  });
});






app.get('/api/going', (req, res) => {

  const user_id = req.query.id;
  const location = req.query.location;

  MongoClient.connect(mongoURL, (err, db) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`connection established with: ${mongoURL}`);

      const places = db.collection('places');

      const Access = (db, callback) => {
        places.findOne({ location }).then((singleNode) => {
          if (singleNode) {
            if (singleNode.going.indexOf(user_id) > -1) {
              let newGoing = singleNode.going;
              newGoing = newGoing.filter(item => item != user_id);
              places.update({ location }, { $set: { going: newGoing } });
            } else {
              const newGoing = singleNode.going;
              newGoing.push(user_id);
              places.update({ location }, { $set: { going: newGoing } });
            }
          } else {
            places.save({ location, going: [user_id] });
          }
        });
      };

      Access(db, () => {
        db.close();
       
      });
       res.send();
    }
  });


});





app.get('/api/yelp', (req, res) => {

  const headers = {
    Authorization: config.yelpToken,
  };
  const options = {
    url: `https://api.yelp.com/v3/businesses/search?term=nightlife&location=${req.query.location}`,
    method: 'GET',
    headers,
  };
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        // Print out the response body
      res.send(body);
    } else {
      res.send(body);
    }
  });


});

app.get('/auth/github', (req, res) => {
  if (req.query.error) {
    res.redirect('/');
  }
  const initialCode = req.query.code;


  const headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/json',
  };

  const options = {
    url: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    headers,
    form: { client_id: config.github.id, client_secret: config.github.secret, code: initialCode },
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const accessToken = queryString.parse(body).access_token;
      const options = {
        maxAge: 1000 * 60 * 60 * 24 * 365, 
      };
      res.cookie('token', accessToken, options);
      res.redirect('/');
    }
  });
});


app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});


app.listen(PORT, () => {
  console.log('====================================');
  console.log(`server started at port: ${PORT}`);
  console.log('====================================');
})
;




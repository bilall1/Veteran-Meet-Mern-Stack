
let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let CommunitySchema = require('../Models/Community');

router.route('/create-Community').post((req, res, next) => {

    CommunitySchema.find({ email: req.body.email }, (error, data) => {
      if (error) {
        res.json("error");
      }
      else {
        var len = data.length;
        if (len >= 1) {

          res.send("Community with this Email Already Exists!!!");
        }
        else {
            CommunitySchema.create(req.body, (error, data) => {
            if (error) {
              res.send("error");
            } else {
              res.send("Community Sucessfuly Registered!!");
            }
          })
        }
      }
    })
  
  
  
  });


  router.route('/check-Community').post((req, res, next) => {
    CommunitySchema.find({ email: req.body.email, password: req.body.password }, (error, data) => {
      if (error) {
        res.json("error");
      }
      else {
        var len = data.length;
  
        if (len >= 1) {
          res.send(data);
        }
        else {
          res.send("Invalid Crededentials");
        }
      }
    })
  })
  
  router.route('/addMyEvent').post((req, res, next) => {

    const object = {
      name: req.body.eventName,
      date: req.body.eventTime
    }
    console.log(object);
    CommunitySchema.findOneAndUpdate(
      { email: req.body.email },
      { $push: { my_events: object } },
      function (error, success) {
        if (error) {
          // console.log(error);
        } else {
          res.send("Event Added");
        }
      });
  })

  router.route('/getMyEvent').post((req, res, next) => {

    CommunitySchema.find({ email: req.body.email }, (error, data) => {
      if (error) {
        res.json("error");
      }
      else {
        var len = data.length;
        if (len >= 1) {
          res.send(data[0].my_events);
        }
        else {
          res.send("Invalid Details");
        }
      }
    })
  })



module.exports = router;
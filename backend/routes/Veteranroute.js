
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

let VeteranSchema = require('../Models/Veteran');

router.route('/create-Veteran').post((req, res, next) => {

  //console.log(req.body.email);
  VeteranSchema.find({ email: req.body.email }, (error, data) => {
    if (error) {
      res.json("error");
    }
    else {
      var len = data.length;
      if (len >= 1) {
        res.send("User with this Email Already Exists!!!");
      }
      else {
        VeteranSchema.create(req.body, (error, data) => {
          if (error) {
            res.send("error");
          } else {
            // console.log(data);
            res.send("Veteran Added Sucessfully");
          }
        })
      }
    }
  })



});

router.route('/check-Veteran').post((req, res, next) => {
  VeteranSchema.find({ email: req.body.email, password: req.body.password }, (error, data) => {
    if (error) {
      res.json("error");
    }
    else {
      var len = data.length;

      if (len >= 1) {
        // console.log("Sending:" + data);
        res.send(data);
      }
      else {
        res.send("Invalid Crededentials");
      }
    }
  })
})

router.route('/picture').post((req, res, next) => {


  // console.log(req.body.email);
  // console.log(req.body.contentPicture);
  res.send(req.body.picture);

  const newPost = {
    content: req.body.contentPicture,
    media: req.body.picture
  }

  VeteranSchema.findOneAndUpdate(
    { email: req.body.email },
    { $push: { Posts: newPost } },
    function (error, success) {
      if (error) {
        // console.log(error);
      } else {
        // console.log(success);
      }
    });

})

router.route('/getPost').post((req, res, next) => {
  VeteranSchema.find({ email: req.body.email }, (error, data) => {
    if (error) {
      res.json("error");
    }
    else {
      var len = data.length;

      if (len >= 1) {
        // console.log("GETPOST:" + data[0].Posts);
        res.send(data[0].Posts);
        // console.log(data[0].Posts);
      }
      else {
        res.send("Invalid Details");
      }
    }
  })
})

router.route('/getAllPost').post((req, res, next) => {
  var arrayOfPosts = [];
  let innerCount = 0;
  VeteranSchema.find({ email: req.body.email }, (error, data) => {
    if (error) {
      res.json("error");
    }
    else {
      var len = data.length;

      if (len >= 1) {

        let length = data[0].followings.length;

        for (let k = 0; k < length; k++) {

          VeteranSchema.find({ email: data[0].followings[k] }, (error, data1) => {
            if (error) {
              // res.json("error");
            }
            else {
              let length1 = data1[0].Posts.length;

              for (let m = 0; m < length1; m++) {
                innerCount = m;
                arrayOfPosts.push(data1[0].Posts[m])
              }

              if (k == length - 1 && innerCount == length1 - 1) {
                res.send(arrayOfPosts);
              }
            }
          })
        }


      }
      else {
        res.send("Invalid Details");
      }
    }
  })
})

router.route('/getAllVeterans').post((req, res, next) => {
  VeteranSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      var len = data.length;

      if (len >= 1) {
        // console.log("Sending:" + data);
        res.send(data);
      }
      else {
        res.send("Data Not Found");
      }
    }
  })
})

router.route('/addFriends').post((req, res, next) => {

  VeteranSchema.findOneAndUpdate(
    { email: req.body.email },
    { $push: { followings: req.body.friend } },
    function (error, success) {
      if (error) {
        // console.log(error);
      } else {
        // console.log(success);
      }
    });
})

router.route('/addMyEvent').post((req, res, next) => {

  const object = {
    name: req.body.eventName,
    date: req.body.eventTime
  }
  console.log(object);
  VeteranSchema.findOneAndUpdate(
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
  VeteranSchema.find({ email: req.body.email }, (error, data) => {
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

router.route('/getAllEvents').post((req, res, next) => {

  var arrayOfEvents = [];
  var innerCount = 0;
  VeteranSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      var len = data.length;

      if (len >= 1) {

        for (let k = 0; k < len; k++) {

          let length1 = data[k].my_events.length;

          for (let m = 0; m < length1; m++) {
            innerCount = m;
            arrayOfEvents.push(data[k].my_events[m])
          }
          if (length1 == 0) {
            length1 = 1;
          }
          if (k == len - 1 && innerCount == length1 - 1) {
            res.send(arrayOfEvents);
          }
          innerCount = 0;
        }
      }
      else {
        res.send("Data Not Found");
      }
    }
  })

})

router.route('/addIntrestedEvent').post((req, res, next) => {


  const object = {
    name: req.body.eventName,
    date: req.body.eventTime
  }
  console.log(object);
  VeteranSchema.findOneAndUpdate(
    { email: req.body.email },
    { $push: { interested_events: object } },
    function (error, success) {
      if (error) {
        // console.log(error);
      } else {
        res.send("Intrested Added");
      }
    });
})

router.route('/getIntrested').post((req, res, next) => {
  VeteranSchema.find({ email: req.body.email }, (error, data) => {
    if (error) {
      res.json("error");
    }
    else {
      var len = data.length;
      if (len >= 1) {
        // console.log(data[0].my_events);
        res.send(data[0].interested_events);
      }
      else {
        res.send("Invalid Details");
      }
    }
  })
})

router.route('/profile').post((req, res, next) => {

  var photoUpload = req.body.picture;

  VeteranSchema.findOneAndUpdate(
    { email: req.body.email },
    { photo: photoUpload },
    function (error, success) {
      if (error) {
        // console.log(error);
      } else {
        // console.log(success);
      }
    });

})
router.route('/getProfilePhoto').post((req, res, next) => {
  VeteranSchema.find({ email: req.body.email }, (error, data) => {
    if (error) {
      res.json("error");
    }
    else {
      var len = data.length;

      if (len >= 1) {
        res.send(data[0].photo);
      }
      else {
        res.send("Invalid Crededentials");
      }
    }
  })
})

router.route('/addHobby').post((req, res, next) => {

  console.log(req.body.hobbyName + req.body.email);

  const object = {
    name: req.body.hobbyName
  }
  console.log(object);
  VeteranSchema.findOneAndUpdate(
    { email: req.body.email },
    { $push: { hobbies: req.body.hobbyName } },
    function (error, success) {
      if (error) {
        // console.log(error);
      } else {
        res.send("Hobby Added");
      }
    });
})

router.route('/getHobby').post((req, res, next) => {
  VeteranSchema.find({ email: req.body.email }, (error, data) => {
    if (error) {
      res.json("error");
    }
    else {
      var len = data.length;
      if (len >= 1) {
        res.send(data[0].hobbies);
      }
      else {
        res.send("Invalid Details");
      }
    }
  })
})

router.route('/addPoints').post((req, res, next) => {

  VeteranSchema.find({ email: req.body.email }, (error, data) => {
    if (error) {
      res.json("error");
    }
    else {
      var len = data.length;
      if (len >= 1) {
        var starsVet = data[0].stars + 3000; 

        VeteranSchema.findOneAndUpdate(
          { email: req.body.email },
          { stars: starsVet },
          function (error, success) {
            if (error) {
              // console.log(error);
            } else {
              // console.log(success);
            }
          });
      }
      else {
        res.send("Invalid error");
      }
    }
  })

})

router.route('/getPoints').post((req, res, next) => {
  VeteranSchema.find({ email: req.body.email }, (error, data) => {
    if (error) {
      res.json("error");
    }
    else {
      var len = data.length;
      if (len >= 1) {

        var points=data[0].stars;

        var name="";

        if(points>=0 && points<40000){
          name="Silver Veteran";
        }
        else if(points>=40000 && points<50000){
          name="Ruby Veteran";
        }
        else if(points>=50000 && points<60000){
          name="Golden Veteran";
        }
        else if(points>= 60000 && points<65000){
          name="Diamond Veteran";
        }
        else if(points>=65000 && points<70000){
          name="Sapphire Veteran";
        }
        else if(points>=70000 && points<100000){
          name="Platinum Veteran";
        }
        else {
          name="Eternal Sage";
        }

        var obj={
          catagory:name,
          stars:points
        }
        res.send(obj);
      }
      else {
        res.send("Invalid Details");
      }
    }
  })
})




module.exports = router;
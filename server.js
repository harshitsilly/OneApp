

// app.use('/api/*', proxy({target: 'https://www.swiggy.com', changeOrigin: true}));



// server.js

// BASE SETUP
var mongoose   = require('mongoose');
mongoose.connect('mongodb://harshit:harsh886@ds133328.mlab.com:33328/harshit');

var Bear    = require('./app/models/bear');
MemberSchema = Bear.member;
RoomSchema = Bear.room;
MeetingSchema = Bear.meeting;


// =============================================================================

// call the packages we need
var express    = require('express'); 
 var request = require('request');
       // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan      = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config');
var path = require('path');
var formidable = require('formidable');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('superSecret', config.secret);
var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.route('/room')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var Room = new RoomSchema();      // create a new instance of the Bear model
        Room.location = req.body.location;
        Room.capacity = req.body.capacity;
        Room.building_name = req.body.building_name;
        Room.floor = req.body.floor;
        Room.room = req.body.room;
       
        Room.tv = req.body.tv;
       
        // Room.features[0].projector = req.body.features[0].projector; 
        // ; // set the bears name (comes from the request)

        

        // save the bear and check for errors
        Room.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' + Room.name});
        });
        
    });
    router.route('/room')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
     var Buliding_name = req.param('Building');
     var Capacity = req.param('Capacity');
        RoomSchema.find({ 'building_name': Buliding_name},  function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    });

      router.route('/member')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {
        if(req.param('name'))
        {
     var Name = req.param('name');
        MemberSchema.find({ 'name' : { "$regex": "^" + Name }},  function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
        }
        else{
           MemberSchema.find({},  function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
        }
    });

 router.route('/meeting')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {
         var userid = req.param('id');
      var meetings = {};
        MeetingSchema.find({ members : { $regex:  userid }},  function(err, bear) {
            if (err)
                res.send(err);
                meetings.mymeetings = bear;
          //  res.json(meetings);
        });
         MeetingSchema.find({ organizer_id : { $regex:  userid }},  function(err, bear) {
            if (err)
                res.send(err);
                meetings.myorganized = bear;
            res.json(meetings);
        });
        
        
    });
//for todays meeting
router.route('/x')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {
     var starttimef = req.param('start');  
 
 
  var endtimef = req.param('end'); 
  console.log(endtimef);
   console.log(starttimef);
 
 var start = parseInt(toHourformat(starttimef));
 var end =  parseInt(toHourformat(endtimef));

 console.log(start);
 console.log(end);
 var FlagConflictMeeting = 0;
      MeetingSchema.find({ 'starttime' : {$gte : start, $lt: end }},function (err,posts) {
      if (err)
                res.send(err);

           
         FlagConflictMeeting = FlagConflictMeeting + posts.length;
         console.log(posts);
        

      });
       MeetingSchema.find({  'endtime' : {$gte: start, $lt: end} },function (err,posts) {
       FlagConflictMeeting = FlagConflictMeeting + posts.length;
      });
      FlagConflictMeeting.start = start;
       MeetingSchema.find({ 'starttime' : {$lt: start}, 'endtime' : {$gte: end} },function (err,posts) {
         FlagConflictMeeting = FlagConflictMeeting + posts.length;
         res.json(FlagConflictMeeting);
      });
       
    });
   // db.posts.find({"starttime in meeting table": {"$gte": start, "$lt": end}}) 

//  MeetingSchema.find({ 'members' : { "$regex":  'I321530' }},  function(err, bear) {
           
//                 console.log(bear);
//           //  res.json(meetings);
//         });


    router.route('/member')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var Member = new MemberSchema();      // create a new instance of the Bear model
         Member.name =  req.body.name;
         Member.password =  req.body.password;
        Member.email =  req.body.email;
        Member.id =  req.body.id;
        Member.mobile =  req.body.mobile;
        // save the bear and check for errors
        Member.save(function(err,member) {
            if (err)
                res.send(err);

            res.json({ message: 'member created!' + member.name});
        });
        
    });

  
  var toHourformat = function(time) {
       var starttime =   time.split(":")[0].concat(time.split(":")[1]);
     if((time.includes("PM") &&  time.split(":")[0] !== "12" ) || ( time.split(":")[0] === "12" && time.includes("AM"))){
     starttime = parseInt(starttime) + 1200; 
 } 
 return starttime;
  }
   
 router.route('/meeting')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var Meeting = new MeetingSchema();      // create a new instance of the Bear model
         Meeting.building_name =  req.body.building_name;
         Meeting.members = req.body.members;
        Meeting.subject =  req.body.subject;
        Meeting.description =  req.body.description;
      var proposedDate =   new Date(req.body.starttime).toLocaleDateString();
      Meeting.proposedDate =  proposedDate;
  var time = new Date(req.body.starttime).toLocaleTimeString();
 Meeting.starttime  = toHourformat(time);
  
  Meeting.date  = new Date(req.body.date),
    time = new Date(req.body.endtime).toLocaleTimeString();
     Meeting.endtime = toHourformat(time);
     Meeting.desired_floor = req.body.desired_floor,
      Meeting.desired_room = req.body.desired_room,
       Meeting.organizer_id =  req.body.organizer_id;
         Meeting.status =  "proposed";
        // save the bear and check for errors
        Meeting.save(function(err,result) {
            if (err)
                res.send(err);

            res.json({ message: 'Meeting created!' + result.Description});
        });
        
    });

   
 
   
router.route('/users')
 .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });


router.route('/setup').get( function(req, res) {

  // create a sample user
  var nick = new User({ 
    name: 'Nick Cerminara', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

app.post('/setup',function(req, res) {

  // create a sample user
  var nick = new User({ 
    name: req.body.name, 
    password: req.body.password,
    admin: true ,
    date : new Date()
  });
  
  User.find({}, function(err, users) {
    users.forEach(function(user) {
      if (user.name === nick.name)
      {
        res.json({ error: nick.name + "User name already exist" });
        
      }
      else{ nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: nick.name + "User saved successfully" });
  });
        
      }
    }, this);
  });

  // save the sample user
 
});

app.get('/users', function(req, res) {
  if(!req.param('name'))
  {
 
   res.sendfile("test1.mp4");
  
}
else{
  var username = req.param('name');
  
   User.find({"name" : username }, function(err, user) {
      if (err) throw err;
      if(user){
         res.json( {"name" : user});
      }
   
  });
  
}
}); 

app.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 60*60*24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

app.post('/upload', function(req, res) {
var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = "upload/"  + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        res.json({"success" : file,
        name : "name"});
    });

    // res.sendFile(__dirname + '/index.html');
 
});
var tokencheck = function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
};



//find meetings going to start in 20mins
//for todays meeting
var longssz= "77.6700";
var latssz= "12.9688";
router.route('/location')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .put(function(req, res) {
         var memberId = req.param('id');
         var slat = req.param('lat');
        var slong = req.param('long');
      
       MemberSchema.update({id : memberId}, {$set: { lat:slat,long :slong }},function (err,posts){
    if(posts)
    { res.json("Succesfully updated");}
    
      });
       
    });

setInterval(function() {
      var start = new Date();  
        var end = new Date(new Date().getTime() + 20 * 60 * 1000); 
 var time = new Date(start).toLocaleTimeString();
 start  = toHourformat(time);
 var time = new Date(end).toLocaleTimeString();
 end  = toHourformat(time);
  
// console.log(start);
// console.log(end);
var upcomingmeetings =[];
      MeetingSchema.find({ 'starttime' : {$gte : start, $lt: end }},function (err,posts){
          if(posts)
          {   
                
            //   console.log(posts);
              for (var index = 0; index < posts.length; index++) {
                  var members = posts[index].members;
                  var amembers = members.split(",");
                  for (var j = 0; j < amembers.length; j++) {
                      var user = amembers[j];
                     MemberSchema.findOne({id : user},function (err,member){
                    if(member)
                    {
                    var alat =   member.lat ;
                     var along =   member.long ;
                     if(!(longssz === along && latssz=== alat))
                     {
                         var urllo = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + latssz + ',' + longssz + '&destinations=' + alat +',' + along +'&key=AIzaSyAZRALmlnUSDc_zHpKlUdoj590lPnIsHY4';
                  
request(urllo, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = JSON.parse(body);
    if( data.rows[0] && data.rows[0].elements[0].duration)
    {
         data = data.rows[0].elements[0].duration.text;
    console.log(data); // Show the HTML for the Google homepage.  
 MemberSchema.update({id : member.id}, {$set: {status : data }},function (err,posts){
    if(posts)
    { console.log("success");
    }
      });
    }
    
  }
}) 

                     }
                      }

                     });  
                  }
               }
          }
      });
       
}, 2000);




// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use(express.static('www'));
app.set('port', process.env.PORT || 7000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

// START THE SERVER
// =============================================================================
// app.listen(port,'10.207.113.90');
// console.log('Magic happens on port ' + port);

//12.924459,77.670191 ssz location

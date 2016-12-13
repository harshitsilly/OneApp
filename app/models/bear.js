var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


// var Features = new Schema({
//  projector: String ,
//         tv :  String
// })
module.exports.room = mongoose.model('Room', new Schema({
    location: String,
    capacity : Number,
    building_name : String,
    floor : Number,
    room : String ,
    
    tv : Boolean
 }));
 
module.exports.member = mongoose.model('Member', new Schema({ 
    name: String, 
    password: String, 
    email: String ,
    id : String,
    mobile : Number,
    long: String,
    lat: String,
    status : String

}));

// var membSchema = new Schema({ id: String });
module.exports.meeting = mongoose.model('Meeting', new Schema({ 
    building_name: String, 
    members: String, 
    subject : String,
    description : String,
    organizer_id : String,
    date:  String,
    starttime : Number,
    endtime : Number,
    proposedDate : String,
    desired_floor : Number,
     desired_room : Number,
    status : String
}
))

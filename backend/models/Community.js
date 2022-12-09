const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let CommunitySchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  my_events:[{name:{type: String}, date:{type: String},invitation:[{email:{type: String}}]}],

}, {
    collection: 'Community'
  })
module.exports = mongoose.model('Community', CommunitySchema)
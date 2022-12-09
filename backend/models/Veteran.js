const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let VeteranSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  profession: {
    type: String
  },
  photo:{
    type: String,
    default : null
  },
  hobbies: [{type: String}],

  my_events:[{name:{type: String}, date:{type: String}}],

  interested_events: [{name:{type: String}, date:{type: String}}],

  followings: [{type: String}],

  followers :[{type: String}],

  stars:{ type: Number,
    default : 0},

  starCategory:{
      type: String
    },
    Posts:[{content:{type: String}, media:{type: String}, Date:{type: Date}}],
}, {
    collection: 'Veteran'
  })
module.exports = mongoose.model('Veteran', VeteranSchema)
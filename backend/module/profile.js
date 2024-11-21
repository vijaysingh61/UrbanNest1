const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  profilePicture: {
    type: String,
    default: 'path/to/default/profile.png' // default profile picture path
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    maxlength: 500 // Limit bio length
  },
  listing : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'room'
  }]

});

module.exports = mongoose.model('profile', profileSchema);

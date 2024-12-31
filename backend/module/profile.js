const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,

    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    
    phone: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    city: {
        type: String,

    },
    state: {
        type: String,

    },
     birthday: {
        type: Date,
        default: null,
    },
    bio: {
        type: String,
        maxlength: 500 // Limit bio length
    },
});

module.exports = mongoose.model('profile', profileSchema);

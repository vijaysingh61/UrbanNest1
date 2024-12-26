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

        unique: true
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
    bio: {
        type: String,
        maxlength: 500 // Limit bio length
    },
});

module.exports = mongoose.model('profile', profileSchema);

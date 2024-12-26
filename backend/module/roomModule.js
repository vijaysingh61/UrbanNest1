const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    local: {
        type: String,
        required: true,
        trim: true, 
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    coordinates:{
        type:Array
    }
});

const roomSchema = new mongoose.Schema({
    profile : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "profile"
    },
    address : {
       type: addressSchema,
       required: true
    },
    rate : Number,
    images : {
        type : [String],
    },
    headline : String,
    description : String,
    measurement : Number,
    isFurnished : Boolean,
    amenities : []

})

module.exports = mongoose.model("room",roomSchema);
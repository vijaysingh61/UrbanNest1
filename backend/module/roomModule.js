const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    address : {
       type: String,
       required: true
    },
    rate : Number,
    images : {
        type : [String],
    },
    headline : String,
    description : String,
    measurement : Number,
    amenities : []

})

module.exports = mongoose.model("room",roomSchema);
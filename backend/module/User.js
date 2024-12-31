const mongoose = require('mongoose')
require("dotenv").config()

mongoose
.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err);
})

const User = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique:true,
        required : true
    },
    password : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('user',User)

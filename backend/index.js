require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const profile = require('./module/profile')
const room = require('./module/roomModule');
const user = require('./module/User')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const multer = require('multer');
const path = require('path')



app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's actual domain
    credentials: true
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/images/uploads', express.static(path.join(__dirname, 'images/uploads')));

mongoose.connection.on('connected',()=>{
    console.log("database connected")
})

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

app.post('/list',upload.array('images',5), async(req, res) => {
    const data = req.body;
    console.log(req.files)
    try{
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        const decoded = jwt.verify(token, process.env.SECRET);

        const email = decoded.email;
        const user1 = await user.findOne({email});
        const createRoom = await room.create({ 
            user:user1._id,
            ...data, 
            images: req.files.map(file => file.path) 
        });
        
        await createRoom.save();
        console.log("room data saved")
    }catch(e){
        console.log(e)
    }
    res.send({ message: 'Data received' });
});

app.get("/get-rooms",async(req,res)=>{
    
    try{
        const rooms = await room.find();
        res.send(rooms)
    }catch(e){
        console.log(e)
    }
    
})

app.get("/myListing",async(req,res)=>{
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        const decoded = jwt.verify(token, process.env.SECRET);

        const email = decoded.email;
        const user1 = await user.findOne({email});
        const rooms = await room.find({user :user1._id})
        res.send(rooms)
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(400).json({ message: 'Invalid token' });
    }
    
})

app.post("/signup",async(req,res)=>{
    const {email,username,password} = req.body;
    
    try{
        let usr = await user.findOne({email});
        if(usr)res.send({message:"user already exist"});
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                // Store hash in your password DB
                const newUser = await user.create({username,email,password:hash})
                await newUser.save();
                let token = jwt.sign({email},process.env.SECRET);
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
                })
                res.json({username,token})
            });
        });
    }catch(e){
        console.log("error = "+e)
    }
})

app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        let usr = await user.findOne({email});
        if(!usr)return res.send({message:"user not exist"});
        else{
            bcrypt.compare(password, usr.password, function(err, result) {
                if(result){
                    let token = jwt.sign({email},process.env.SECRET);
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
                    })
                    const username = usr.username;
                    res.json({username,token})
                }
                else res.send({message:"wrong password"})
            });
        }
        
    }catch(e){
        console.log(e)
    }
    
})

app.get('/api/check-auth', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ authenticated: false });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.json({ authenticated: false });
        res.json({ authenticated: true , user: decoded.email });
    });
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

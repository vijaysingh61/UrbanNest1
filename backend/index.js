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
const axios = require('axios');
const fs = require('fs')



app.use(cors({
    origin: 'https://urban-nest-ruby.vercel.app', 
    credentials: true, 
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], 
}));

app.options('*', cors());

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
    cb('', './images/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

//getin coordinates
async function getLatLngFromAddress(addressString) {
    const apiKey = process.env.OPENCAGE_API_KEY; // Replace with your OpenCage API key
    const encodedAddress = encodeURIComponent(addressString);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status.code === 200 && data.results.length > 0) {
            const location = data.results[0].geometry;
            return [ location.lat, location.lng ];
        } else {
            throw new Error(`Geocoding error: ${data.status.message}`);
        }
    } catch (error) {
        console.error('Error fetching geocoding data:', error.message);
        return null;
    }
}

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
        const user1 = await profile.findOne({email});
        const address = JSON.parse(req.body.address);
        
        const fullAddress = `${address.local}, ${address.city}, ${address.state} , india`;

        const coordinates = await getLatLngFromAddress(fullAddress);

        if (!coordinates) {
            return res.status(400).json({ message: 'Unable to fetch coordinates for the provided address' });
        }
        const createRoom = await room.create({ 
            profile:user1._id,
            ...data, 
            address : {...address,coordinates},
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
    const {budget,location} = req.query;
    //console.log(budget,location)
    try{
        const query = {}
        if (location) {
            query['address.city'] = new RegExp(`^${location}$`, 'i'); 
        }

        if (budget.lower !== '' && budget.upper !== '') {
            query.rate = { $gte: budget.lower, $lte: budget.upper }; 
        } else if (budget.lower !== '') {
            query.rate = { $gte: budget.lower }; 
        } else if (budget.upper !== '') {
            query.rate = { $lte: budget.upper }; 
        }
        //console.log(query)
        const rooms = await room.find(query).populate('profile','name age profilePicture');
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
        const user1 = await profile.findOne({email});
        const rooms = await room.find({profile :user1._id}).populate('profile','name age profilePicture')
        res.send(rooms)
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(400).json({ message: 'Invalid token' });
    }
    
})

app.get("/get-profile",async(req,res)=>{
     try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        const decoded = jwt.verify(token, process.env.SECRET);

        const email = decoded.email;
        const profile1 = await profile.findOne({email});
        res.send(profile1);
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(400).json({ message: 'Invalid token' });
    }
})

app.post("/profile-pic",upload.single("profilePicture"), async(req,res)=>{
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        const decoded = jwt.verify(token, process.env.SECRET);

        const email = decoded.email;
        const updatedprofile = await profile.findOneAndUpdate(
            { email },
            {
                $set: {
                    profilePicture: req.file.path // Set the new profile picture
                }
            },
            { new: true } // Return the updated document
        );
        console.log("pic updated")
        res.send(updatedprofile)
        
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(400).json({ message: 'Invalid token' });
    }
})

app.put("/update-profile", async (req, res) => {
  try {
    
    const userId = req.body.userId; 
    console.log(userId)
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Destructure the fields to update from the request body
    const { phone, birthday, gender, bio } = req.body;

    // Validate input (optional)
    if (!phone && !birthday && !gender && !bio) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    // Build the update object dynamically
    const updateFields = {};
    if (phone) updateFields.phone = phone.toString();
    if (birthday){
        updateFields.birthday = new Date(birthday);
        const currentYear = new Date().getFullYear();
        const birthDate = new Date(birthday).getFullYear();
        updateFields.age = currentYear - birthDate;
    } 
    if (gender) updateFields.gender = gender;
    if (bio) updateFields.bio = bio;

    // Update the user in the database
    const updatedUser = await profile.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

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
                const newProfile = await  profile.create({user:newUser._id,name:username,email})
                await newProfile.save();
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

app.get("/logout", async (req, res) => {
    res.cookie('token', '', { expires: new Date(0), httpOnly: true, secure: true, path: '/' });
    res.send('Logged out');
});


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

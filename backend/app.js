const express = require("express");
const mongoose = require("mongoose");
const EventModel = require("./EventModel");
const cookieParser = require("cookie-parser");
const app = express();
var cors = require('cors');
const { UserAuth } = require("./middleware/auth");
require('dotenv').config();
app.use(cookieParser());
app.use(express.json());
app.use( cors({
  origin: "http://localhost:5173", // Make sure this matches the frontend origin exactly
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"], // Ensure PATCH is included
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  credentials: true, // Allow cookies and credentials
}))

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://subramani420:BJht2uUTg5bzfXNx@gateway.ju3xi.mongodb.net/");
};

app.delete("/deteteRegistration",UserAuth,async(req,res)=>{
  try{
    await EventModel.deleteMany({});
    res.send("Deleted all the registration details");
    console.log("Deleted all the registration details");
  }catch(err){
    res.status(400).send("Error in deleting the registration details :"+err);
  }
})

app.post("/register",async (req, res) => {
  try {
    const {
      Participant1_Name,
      Participant1_rollno,
      Participant2_Name,
      Participant2_rollno,
      college,
      phoneNo,
      events,
    } = req.body.formData;

    console.log(req.body.formData);
    console.log("events length:"+events.length);

    if (!events || !Array.isArray(events) || events.length === 0) {
      return res.status(400).send("Events must be a non-empty array");
    }
    let count = await EventModel.countDocuments({
      college,
      $or: [
        { Participant1_rollno },
        { Participant2_rollno },
        { Participant1_rollno: Participant2_rollno },
        { Participant2_rollno: Participant1_rollno },
      ],
    });
    count+=events.length; 
    console.log("count "+count);
    if (count > 3) {
      console.log("Cannot register. The limit of 3 has been reached for this combination.");
      throw new Error("Cannot register. The limit of 3 has been reached")
    }

    let findAlreadyRegisterForEvents = await EventModel.find({
      college,
      events: { $in: events },
      $or: [
        { Participant1_rollno },
        { Participant2_rollno },
        { Participant1_rollno: Participant2_rollno },
        { Participant2_rollno: Participant1_rollno },
      ],
    }); 
    if(findAlreadyRegisterForEvents.length>0){
      console.log("Cannot register. You have already register for this event");
      throw new Error(`Cannot register.You have already register for this event`)
    }
    
   
    const documents = events.map((events ) => {
      return {
        Participant1_Name,
        Participant1_rollno,
        Participant2_Name,
        Participant2_rollno,
        college,
        phoneNo,
        events,
      };
    });

    console.log(documents);
    await EventModel.insertMany(documents);
    res.send("Registered successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send("Error in registration :"+err.message);
  }
});

app.get("/getregisterationdetails",UserAuth, async (req,res)=>{
  try{
    const user = await EventModel.find({}).select("Participant1_Name Participant1_rollno Participant2_Name Participant2_rollno college phoneNo events");
    res.send(user);

  }catch(err){
    res.status(400).send("error : "+err)
  }
})

app.post("/adminLogin" , async(req,res)=>{
  const {username, password} = req.body.formData;
  console.log(req.body.formData);
  if(username === process.env.ADMIN_USERNAME  && password === process.env.ADMIN_PASSWORD){
    res.cookie("token",process.env.ADMIN_USERNAME+"!@#123"+process.env.ADMIN_PASSWORD, { expires: new Date(Date.now() +  7* 24 * 60 * 60 * 1000)});
    res.send("authenticated");
  }else{
    res.status(400).send("Invalid credentials");
  }
});

app.get("/checkAuth", (req, res) => {
  const token = req.cookies.token; // Retrieve the token from the cookies
  if (token  === process.env.TOKEN) {
    return res.json({ authenticated: true }); // User is authenticated
  }
  res.json({ authenticated: false }); // User is not authenticated
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Listening to the port 3000");
    });
  })
  .catch((err) => {
    console.log("Error: " + err.message);
  });

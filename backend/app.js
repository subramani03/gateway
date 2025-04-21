const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const EventModel = require("./EventModel");
const symposiumModel = require("./symposiumModel");
const cookieParser = require("cookie-parser");
const app = express();
var cors = require("cors");
require("dotenv").config();
const { UserAuth } = require("./middleware/auth");
const multer = require("multer");
const path = require("path");
const { BASE_URL } = require("./Utils/constants.js");
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "https://gateway-6epe.onrender.com/",                          // Make sure this matches the frontend origin exactly
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],      // Ensure PATCH is included
    allowedHeaders: ["Content-Type", "Authorization"],      // Allow these headers
    credentials: true, // Allow cookies and credentials
  })
);

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://subramani420:BJht2uUTg5bzfXNx@gateway.ju3xi.mongodb.net/"
  );
};

let isRegistrationClosed = false; // Global state in server

// API to get the current registration status
app.get("/registration-status", (req, res) => {
  res.json({ isRegistrationClosed });
});

// API to update the registration status
app.post("/registration-status", (req, res) => {
  isRegistrationClosed = req.body.isClosed;
  if (isRegistrationClosed) {
    res.json({
      message: "Registration form closed!",
      RegistrationFormClosed: true,
    });
  } else {
    res.json({
      message: "Registration form opened",
      RegistrationFormClosed: false,
    });
  }
});

app.delete("/deteteRegistration", UserAuth, async (req, res) => {
  try {
    await EventModel.deleteMany({});
    res.send("Deleted all the registration details");
    console.log("Deleted all the registration details");
  } catch (err) {
    res.status(400).send("Error in deleting the registration details :" + err);
  }
});

app.post("/register", async (req, res) => {
  try {
    console.log(req.body.formDatas);
    const {
      Participants,
      college,
      phoneNo,
      events,
    } = req?.body?.formDatas;

    console.log(req.body.formData);
    console.log("events length:" + events.length);

    if (!events || !Array.isArray(events) || events.length === 0) {
      return res.status(400).send("Events must be a non-empty array");
    }
    
    if (!Participants || !Array.isArray(Participants) || Participants.length === 0) {
      return res.status(400).send("Events must be a non-empty array");
    }

    let rollnos = Participants.map((participant)=>participant.roll_no); 
    let count = await EventModel.countDocuments({
      college,
      $or: [
        { Participant_Rollnos: { $in: rollnos } }
      ],
    });
    count += events.length;
    console.log("count " + count);
    if (count > 3) {
      console.log(
        "Cannot register. The limit of 3 has been reached for this combination."
      );
      throw new Error("Cannot register. The limit of 3 has been reached");
    }

    let findAlreadyRegisterForEvents = await EventModel.find({
      college,
      events: { $in: events },
      $or: [
        { Participant_Rollnos: { $in: rollnos } }
        
      ],
    });
    if (findAlreadyRegisterForEvents.length > 0) {
      console.log("Cannot register. You have already register for this event");
      throw new Error(
        `Cannot register.You have already register for this event`
      );
    }

    const documents = events.map((events) => {
      return {
        Participants,
        Participant_Rollnos:rollnos,
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
    res.status(400).send("Error in registration :" + err.message);
  }
});

app.get("/getregisterationdetails", UserAuth, async (req, res) => {
  try {
    const user = await EventModel.find({}).select(
      "Participants college phoneNo events"
    );
    res.send(user);
  } catch (err) {
    res.status(400).send("error : " + err);
  }
});

app.post("/adminLogin", async (req, res) => {
  const { username, password } = req.body.formData;
  console.log(req.body.formData);
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res.cookie(
      "token",
      process.env.ADMIN_USERNAME + "!@#123" + process.env.ADMIN_PASSWORD,
      { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
    );
    res.send("authenticated");
  } else {
    res.status(400).send("Invalid credentials");
  }
});

app.get("/checkAuth", (req, res) => {
  const token = req.cookies.token; // Retrieve the token from the cookies
  if (token === process.env.TOKEN) {
    return res.json({ authenticated: true }); // User is authenticated
  }
  res.json({ authenticated: false }); // User is not authenticated
});

//! Images Routes
//Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});
//'event_logo' --> fieldname

app.use("/images", express.static("upload/images"));
// creating upload Endpoint for images

app.post("/upload", upload.single("eventLogo"), (req, res) => {
  res.json({
    success: 1,
    image_url: `${BASE_URL}images/${req?.file.filename}`,
  });
});

app.put("/updateEventDetails", async (req, res) => {
  try {
    const updateData = req.body;
    const result = await symposiumModel.updateOne(
      { _id: new ObjectId("67fc73d90e889a4b643cc8be") },
      { $set: updateData }
    );
    console.log(req.body);

    if (result.modifiedCount === 1) {
      res.status(200).send("updated successfully");
    } else {
      res.status(404).send("no change made");
    }
  } catch (err) {
    console.error(err);
    res.status(400).send("Error in update :" + err.message);
  }
});

app.get("/getEventDetails", async (req, res) => {
  try {
    const result = await symposiumModel.findById({
      _id: new ObjectId("67fc73d90e889a4b643cc8be"),
    });
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error in update :" + err.message);
  }
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

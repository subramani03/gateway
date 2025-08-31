const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const EventModel = require("./EventModel");
const symposiumModel = require("./symposiumModel");
const cloudinary = require("./Config/cloudinary");
const cookieParser = require("cookie-parser");
const app = express();
var cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const { Readable } = require("stream");
const { UserAuth } = require("./middleware/auth");
const multer = require("multer");
const path = require("path");

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload()); // Middleware for parsing form-data

const { BASE_URL, FRONTEND_BASE_URL } = require("./Utils/constants.js");

app.use(
  cors({
    origin: FRONTEND_BASE_URL, // Make sure this matches the frontend origin exactly
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"], // Ensure PATCH is included
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
    credentials: true, // Allow cookies and credentials
  })
);

console.log(FRONTEND_BASE_URL);

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
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

app.delete("/deteteOneRegistration/:id", UserAuth, async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    const result = await EventModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      res.send("no records matched to delete");
    }
    res.send("Deleted Succesfully");
    console.log(result + "Deleted");
  } catch (err) {
    res.status(400).send("Error in deleting the registration details :" + err);
  }
});

app.post("/register", async (req, res) => {
  try {
    console.log(req.body.formDatas);
    const { Participants, college, department, phoneNo, events } =
      req?.body?.formDatas;

    // console.log("events length:" + events.length);

    if (!events || !Array.isArray(events) || events.length === 0) {
      return res.status(400).send("Events must be a non-empty array");
    }

    if (
      !Participants ||
      !Array.isArray(Participants) ||
      Participants.length === 0
    ) {
      return res.status(400).send("Events must be a non-empty array");
    }

    let rollnos = Participants.map((participant) => participant.roll_no);
    let count = await EventModel.countDocuments({
      college,
      $or: [{ Participant_Rollnos: { $in: rollnos } }],
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
      $or: [{ Participant_Rollnos: { $in: rollnos } }],
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
        Participant_Rollnos: rollnos,
        department,
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
      "Participants college department phoneNo events"
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
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true only in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }
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
// const storage = multer.diskStorage({
//   destination: "./upload/images",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
// });
// //'event_logo' --> fieldname

// app.use("/images", express.static("upload/images"));
// // creating upload Endpoint for images

// app.post("/upload", upload.single("eventLogo"), (req, res) => {
//   res.json({
//     success: 1,
//     image_url: `${BASE_URL}images/${req?.file.filename}`,
//   });
// });

// app.post('/upload', async (req, res) => {
//   try {
//     const file = req.files?.eventLogo;

//     if (!file) {
//       return res.status(400).json({ success: 0, message: 'No file uploaded' });
//     }

//     const result = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           folder: 'eventImages',
//           resource_type: 'image',
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );

//       // ✅ Convert buffer to stream and pipe to Cloudinary
//       Readable.from(file.data).pipe(uploadStream);
//     });

//     return res.json({ success: 1, image_url: result.secure_url });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: 0, error: error.message });
//   }
// });

app.post("/upload-media", async (req, res) => {
  try {
    const file = req.files?.media; // fieldname: 'media'

    if (!file) {
      return res.status(400).json({ success: 0, message: "No file uploaded" });
    }

    // Detect type from mimetype
    const mimeType = file.mimetype; // e.g., 'image/png' or 'video/mp4'
    console.log(file.mimetype);
    const isVideo = mimeType.startsWith("video/");
    console.log(isVideo);

    const resourceType = isVideo ? "video" : "image";

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: isVideo ? "eventVideos" : "eventImages",
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      Readable.from(file.data).pipe(uploadStream);
    });
    console.log(result.secure_url);

    return res.json({
      success: 1,
      image_url: result.secure_url,
      type: resourceType,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, error: error.message });
  }
});

app.put("/updateEventDetails", async (req, res) => {
  try {
    const updateData = req.body;
    console.log(updateData);
    const result = await symposiumModel.updateOne(
      { _id: new ObjectId("67fc73d90e889a4b643cc8be") },
      { $set: updateData },
      { runValidators: true } // <-- force schema validation
    );

    console.log("modifiedCount:" + result.modifiedCount);
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
    app.listen(process.env.PORT, () => {
      console.log("Listening to the port 3000");
    });
  })
  .catch((err) => {
    console.log("Error: " + err.message);
  });

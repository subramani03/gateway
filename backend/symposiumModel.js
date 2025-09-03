const { Mongoose, default: mongoose } = require("mongoose");

const contactPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ph_no: { type: Number, required: true }
});

const roundSchema = new mongoose.Schema({
  roundName: { type: String, required: true },   // e.g., "Round 1"
  rules: [{ type: String, required: true }]      // list of rules for that round
});

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  imgUrl: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },

  rounds: [roundSchema]  // <-- Instead of plain rules
});

const symposiumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  about: { type: String, required: true },
  organizers: { type: String, required: true },
  organizers_description: { type: String, required: true },
  logo: { type: String },
  back_groud_video: { type: String },
  symposiumType: { type: String, enum: ["inter", "intra"], default: "inter" },
  Date: { type: Date, required: true },
  location: { type: String, required: true },
  time: { type: String, required: true },
  RegistrationFees: { type: Number, required: true },
  perTeamSize: { type: Number, required: true, minLength: 1, maxLength: 4, },

  social_media: {
    instagram: { type: String },
    mail: { type: String }
  },
  contact: {
    forRegistrationDetails: [contactPersonSchema],
    forEventDetails: [contactPersonSchema]
  },
  events: [eventSchema]
});

const symposiumModel =  mongoose.model('symposium', symposiumSchema);
module.exports = symposiumModel;

const { Mongoose, default: mongoose } = require("mongoose");
const validator = require("validator");

const EventSchema = mongoose.Schema(
    {
        Participant1_Name: {
          type: String,
          required: true,
          trim:true,
          minLength: 2,
          maxLength: 50,
        },
        Participant1_rollno: {
          type: String,
          required: true,
          trim:true,
          lowercase: true,
          minLength: 1,
          maxLength: 10,
        },
        Participant2_Name: {
          type: String,
          trim:true,
          minLength: 2,
          maxLength: 50,
        },
        Participant2_rollno: {
          type: String,
          trim:true,
          minLength: 1,
          lowercase: true,
          maxLength: 10,
        },
        college: {
          type: String,
          required: true,
          minLength: 3,
          trim:true,
          maxLength: 50,
          lowercase: true,
        },
        events: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 50,
          },
        phoneNo: {
          type:String,
          required: true,
          trim:true,
          minLength: 10,
          maxLength: 10,
          validate(value) {
            if (!validator.isMobilePhone(value, 'en-IN')) {
              throw new Error("Invalid phone number");
            }
          },
        }
  },
  { timestamps: true },
);

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;

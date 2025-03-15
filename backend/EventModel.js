const { Mongoose, default: mongoose } = require("mongoose");
const validator = require("validator");

const EventSchema = mongoose.Schema(
    {
        Participant1_Name: {
          type: String,
          required: true,
          minLength: 4,
          maxLength: 50,
        },
        Participant1_rollno: {
          type: String,
          required: true,
          minLength: 1,
          maxLength: 10,
        },
        Participant2_Name: {
          type: String,
          required: true,
          minLength: 4,
          maxLength: 50,
        },
        Participant2_rollno: {
          type: String,
          required: true,
          minLength: 1,
          maxLength: 10,
        },
        college: {
          type: String,
          required: true,
          minLength: 4,
          maxLength: 50,
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

const { Mongoose, default: mongoose } = require("mongoose");
const validator = require("validator");

const EventSchema = mongoose.Schema(
  {
    Participants: {
      type: [
        {
          name: { type: String },
          roll_no: { type: String },
        },
      ],
      validator: {
        validate: function (value) {
          return (
            Array.isArray(value) &&
            value.length > 0 &&
            value[0].name?.trim() &&
            value[0].rollno?.trim()
          );
        },
        message:
          "At least one participant with valid name and roll number is required",
      },
    },
    Participant_Rollnos: {
      type: [String],
      required: true,
    },
    college: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
      maxLength: 50,
      lowercase: true,
    },
     department: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
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
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 10,
      validate(value) {
        if (!validator.isMobilePhone(value, "en-IN")) {
          throw new Error("Invalid phone number");
        }
      },
    },
  },
  { timestamps: true }
);

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;

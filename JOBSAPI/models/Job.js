const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    // when we are creating the job, we will provide only above two fields in the frontend. Below field will be used when we are modifying the job position.
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      // every job we created will be associated to the user
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true } //we get createdAt and updatedAt fields by making it true.
);

module.exports = mongoose.model("Job", JobSchema);

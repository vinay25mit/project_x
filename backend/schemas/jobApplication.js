const mongoose = require("mongoose");

const jobApplication = mongoose.Schema({
  jobId: {
    type: String,

    required: true,
  },

  candiadateId: {
    type: String,

    required: true,
  },

  stauts: {
    type: String,

    enum: ["Applied", "To be inerviewd", "Rejected", "Selected"],

    required: true,
  },

  createdAt: {
    type: Date,

    default: Date.now,
  },
});

module.exports = jobApplication;

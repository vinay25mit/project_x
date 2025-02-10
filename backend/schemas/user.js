const moongose = require("mongoose");

const userSchema = new moongose.Schema({
  email: {
    type: String,

    required: true,
  },

  password: {
    type: String,

    required: true,
  },

  role: {
    type: String,

    enum: ["employer", "job_seeker"],

    required: true,
  },

  createdAt: {
    type: Date,

    default: Date.now,
  },
});

module.exports = userSchema;

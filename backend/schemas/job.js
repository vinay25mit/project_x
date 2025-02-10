const mongoose = require("mongoose");

const job = mongoose.Schema({
  title: {
    type: String,

    required: true,
  },

  description: {
    type: String,

    required: true,
  },

  companyName: {
    type: String,

    required: true,
  },

  skills: [{ type: String }],

  salary: {
    min: {
      type: Number,

      required: true,
    },

    max: {
      type: Number,

      required: true,
    },
  },

  experience: {
    type: Number,

    required: true,
  },
});

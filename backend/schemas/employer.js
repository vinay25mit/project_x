const moongose = require("mongoose");

const employer = moongose.Schema({
  email: {
    type: String,

    required: true,
  },

  password: {
    type: String,

    required: true,
  },

  companyName: {
    type: String,

    required: true,
  },

  companyDescription: {
    type: String,

    required: true,
  },

  preference: new moongose.Schema({
    requiredSkils: [{ type: String }],

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
  }),
});

module.exports = employer;

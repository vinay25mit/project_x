const mongoose = require("mongoose");

const jobSeekerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  experience: { type: String, required: true },
  resume: { type: String, required: true },
  preference: {
    role: { type: String, required: true },  // ✅ Fix spelling
    location: { type: String, required: false },
  },
});
module.exports = jobSeekerSchema

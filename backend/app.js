const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Ensure correct path

const app = express();

app.use(express.json());
app.use(cors());

//Connect to MongoDB once
connectDB();

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1", require("./routes/jobSeekerRoutes"));
app.use("/api/v1/employers", require("./routes/employerRoute")); 
app.use("/api/v1/jobs", require("./routes/jobRoutes"));

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});

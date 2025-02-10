const express = require("express");

const jobSeekerService = require("../service/jobSeekerService");

const jobSeekerRouter = express.Router();

const employerService = require("../service/employerService");
const upload = require("../middleware/uploadMiddleware");

const authMiddleware = require("../middleware/authMiddleware");
const jobApplication = require("../schemas/jobApplication");

// jobSeekerRouter.post("/profiles", authMiddleware, async (req, res, next) => {
//   try {
//     const { userId, email, role } = req.user;

//     if (role == "job_seeker") {
//       const response = await jobSeekerService.createProfile(req.body);

//       if (response) {
//         res.status = 201;

//         res.json({ message: "Profile created Successfully" });
//       }
//     } else if (role == "employer") {
//       const response = await employerService.createProfile(req.body);

//       if (response) {
//         res.status = 201;

//         res.json({ message: "Profile Created Successfully" });
//       }
//     }
//   } catch (error) {
//     throw error;
//   }
// });
jobSeekerRouter.post(
    "/profiles",
    authMiddleware,
    upload.single("resume"), // Handle file uploads
    async (req, res, next) => {
      try {
        console.log("Received Data:", req.body);
        console.log("Uploaded Resume:", req.file);
  
        if (!req.body.name || !req.body.email || !req.body.password || !req.file) {
          return res.status(400).json({ error: "Missing required fields" });
        }
  
        const profileData = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          experience: req.body.experience,
          preference: {
            role: req.body.role || "ok",
            location: req.body.location || "ol",
          },
          resume: "rsume", // Convert file to base64
        };
    console.log("job seeker",profileData)
        const response = await jobSeekerService.createProfile(profileData);
        console.log("check job seeker service chla ya nhi",response)
        res.status(201).json({ message: "Profile created successfully" });
      } catch (error) {
        next(error);
      }
    }
  );

jobSeekerRouter.post("/apply/:jobId", authMiddleware, (rq, res, next) => {
  try {
    const jobId = req.params.jobId;
  } catch (error) {
    next(error);
  }
});

module.exports = jobSeekerRouter;

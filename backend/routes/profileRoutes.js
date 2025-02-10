const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const jobSeekerProfile = require("../model/jobSeekerProfile");

const EmployerProfile = require("../model/EmployerProfile");

const router = express.Router();

console.log("profile route m aaya ....");

router.post("/", authMiddleware, async (req, res) => {
  console.log("here aaya profile create krnre...");

  try {
    const { id: userId, role } = req.user;

    console.log("req checking in backend", req.user);

    if (role == "job_seeker") {
      const { name, preferences } = req.body;

      console.log("req body check in back end", req.body);

      if (!name) {
        return res
          .status(400)
          .json({ error: "Name is required for job seekers" });
      }

      const profile = await jobSeekerProfile.create({
        userId,
        name,
        preferences,
      });

      res.json({ succes: true, profile });
    } else if (role == "employer") {
      const { companyName, companyDescription } = req.body;

      console.log("company nme", companyName, "compdesc", companyDescription);

      if (!companyName || !companyDescription) {
        return res
          .status(400)
          .json({ error: "Company name nd description are required" });
      }

      const profile = await EmployerProfile.create({
        userId: userId,
        company_name: companyName,
        company_description: companyDescription,
      });

      return res.json({ succes: true, profile });
    } else {
      return res.status(400).json({ message: "Invalid Role" });
    }
  } catch (err) {
    console.log("here coming not created");

    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

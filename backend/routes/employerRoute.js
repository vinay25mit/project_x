const express = require("express");
const employerRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Employer = require("../models/employer");

employerRouter.post(
  "/profiles",
  authMiddleware,
  async (req, res, next) => {
    try {
      console.log("Received Employer Data:", req.body);

      if (!req.body.email || !req.body.password || !req.body.companyName || !req.body.companyDescription) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const employerData = {
        email: req.body.email,
        password: req.body.password,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
        preference: {
          requiredSkils: req.body.requiredSkils || [],
          salary: {
            min: req.body.salaryMin,
            max: req.body.salaryMax,
          },
        },
      };

      console.log("Employer Profile Data:", employerData);

      const newEmployer = new Employer(employerData);
      await newEmployer.save();

      res.status(201).json({ message: "Employer profile created successfully", employer: newEmployer });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = employerRouter;

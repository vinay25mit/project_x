const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const job = require("../model/Job");

const router = express.Router();

router.get("/", async (req, res) => {
  const jobs = await job.find();

  res.json(jobs);
});

router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role != "employer")
    return res.status(403).json({ error: "Unauthorized" });

  const job = await job.create({
    ...req.body,
    employerId: req.user.id,
  });

  res.json(job);
});

router.post("/:jobId/apply", authMiddleware, async (req, res) => {
  res.json({ success: true, message: "Application sent" });
});

module.exports = router;

const express = require("express");

const authService = require("../service/authService");

const jwt = require("jsonwebtoken");

const authRoute = express.Router();

authRoute.post("/signup", async (req, res, next) => {
  try {
    const response = await authService.register(req.body);

    if (response) {
      res.status = 200;

      res.json(response);
    }
  } catch (err) {
    next(err);
  }
});

authRoute.post("/login", async (req, res, next) => {
  try {
    const response = await authService.login(req.body);

    if (response) {
      res.status = 200;

      res.json(response);
    }
  } catch (err) {
    next(error);
  }
});

module.exports = authRoute;

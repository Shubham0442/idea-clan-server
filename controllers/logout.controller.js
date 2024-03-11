const { Router } = require("express");
const { User } = require("../models/user.model");
const logoutController = Router();

logoutController.patch("/:userId", async (req, res) => {
  try {
    await User.findByIdAndUpdate({ _id: req?.params?.userId }, { ...req.body });
    res.status(201).send({ message: "Logout Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
});

module.exports = { logoutController };

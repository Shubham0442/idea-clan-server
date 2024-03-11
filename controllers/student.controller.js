const { Router } = require("express");
const { User } = require("../models/user.model");
const { authorization } = require("../middlewares/authorization");
const { authentication } = require("../middlewares/authentication");

const studentController = Router();

studentController.get(
  "/",
  authentication,
  authorization(["admin"]),
  async (req, res) => {
    try {
      const students = await User.find({ role: "student" });
      res.status(200).send({ students });
    } catch (error) {
      res
        .status(500)
        .send({ message: "something went wrong please signup again" });
    }
  }
);

studentController.patch(
  "/update-courses/:studentId",
  authentication,
  authorization(["admin"], async (req, res) => {})
);

studentController.patch(
  "/update-role/:studentId",
  authentication,
  authorization(["admin"], async (req, res) => {
    try {
      const { studentId } = req.params;
      const students = await User.find({ _id: studentId }, { ...req.body });
      res.status(200).send({ message: "Updated Role Successfully" });
    } catch (error) {
      res
        .status(500)
        .send({ message: "something went wrong please signup again" });
    }
  })
);

module.exports = { studentController };

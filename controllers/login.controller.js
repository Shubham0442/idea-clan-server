const { Router } = require("express");
const { User } = require("../models/user.model");
const loginController = Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authentication } = require("../middlewares/authentication");

loginController.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    const hash = user.password;
    bcrypt.compare(password, hash, async function (err, result) {
      if (err) {
        console.log(err);
        res.status(401).send({ message: "something went wrong try again" });
      } else if (result === true) {
        await User.findByIdAndUpdate({ _id: user._id }, { active: true });

        const token = jwt.sign(
          {
            userId: user._id
          },
          process.env.SECRET
        );

        res.status(201).send({
          message: "Login Successful",
          token: token,
          user: {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            mobile: user.mobile,
            bio: user.bio,
            role: user.role,
            email: user.email
          }
        });
      } else {
        res.status(401).send({ message: "please login again" });
      }
    });
  } else res.status(500).send({ message: "something went wrong" });
});

loginController.get("/getactive", async (req, res) => {
  try {
    const all = await User.find();

    res.send({ all: all });
  } catch (error) {
    res.status(500).send({ message: "something went wrong" });
  }
});

loginController.patch(
  "/update/:studentId",
  authentication,
  async (req, res) => {
    try {
      const { studentId } = req.params;

      await User.findByIdAndUpdate({ _id: studentId }, { ...req.body });
      res.status(201).send({ message: "Updated Details Successfully" });
    } catch (error) {
      res
        .status(500)
        .send({ message: "something went wrong please signup again" });
    }
  }
);

module.exports = { loginController };

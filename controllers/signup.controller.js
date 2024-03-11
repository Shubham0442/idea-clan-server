const { Router } = require("express");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

const signupController = Router();

signupController.post("/", (req, res) => {
  const { mobile, firstname, lastname, email, password, active, role, bio } =
    req.body;

  bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      res
        .status(401)
        .send({ message: "something went wrong please signup again" });
    }
    try {
      const user = new User({
        mobile,
        firstname,
        lastname,
        email,
        password: hash,
        role,
        bio,
        active
      });
      await user.save();
      res.status(201).send({ message: "Sigup Successful" });
    } catch (error) {
      console.log("err", error);
      res
        .status(500)
        .send({ message: "something went wrong please signup again" });
    }
  });
});

module.exports = { signupController };

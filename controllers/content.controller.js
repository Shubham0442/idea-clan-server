const { Router } = require("express");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
const { Content } = require("../models/content.model");

const contentController = Router();

contentController.get(
  "/",
  authentication,
  authorization(["admin"]),
  async (req, res) => {
    try {
      const content = await Content.find().sort({ created_at: -1 });
      res.status(200).send({ content });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Something went wrong. Please Try Again" });
    }
  }
);

contentController.get("/student", authentication, async (req, res) => {
  try {
    const { courses } = req?.query;
    if (courses && courses?.length !== 0) {
      const content = await Content.aggregate([
        { $match: { course_name: { $in: req.query.courses } } },
        { $sort: { created_at: -1 } }
      ]);
      res.status(200).send({ content });
    } else res.status(200).send({ content: [] });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong. Please Try Again" });
  }
});

contentController.post(
  "/new",
  authentication,
  authorization(["admin"]),
  async (req, res) => {
    try {
      const newContent = new Content(req.body);
      await newContent.save();
      res.status(201).send({ message: "Created New Content!" });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Something went wrong. Please Try Again" });
    }
  }
);

contentController.patch(
  "/update/:contentId",
  authentication,
  authorization(["admin"]),
  async (req, res) => {
    try {
      const { contentId } = req.params;
      await Content.findByIdAndUpdate({ _id: contentId }, { ...req.body });
      res.status(201).send({ message: "Content Updated!" });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Something went wrong. Please Try Again" });
    }
  }
);

contentController.patch(
  "/remove/:contentId",
  authentication,
  authorization(["admin"]),
  async (req, res) => {
    try {
      const { contentId } = req.params;
      await Content.findByIdAndDelete({ _id: contentId });
      res.status(201).send({ message: "Content Removed!" });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Something went wrong. Please Try Again" });
    }
  }
);

module.exports = { contentController };

const { Router } = require("express");
const { Course } = require("../models/course.model");
const { authorization } = require("../middlewares/authorization");
const { authentication } = require("../middlewares/authentication");

const courseController = Router();

courseController.post(
  "/new",
  authentication,
  authorization(["admin"]),
  async (req, res) => {
    try {
      const course = await Course.findOne({
        course_name: req?.body?.course_name
      });

      if (course) {
        res.status(409).send({ message: "Course already exist!" });
      } else {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).send({ message: "Course Created Successfully!" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Something went wrong. Please Try Again" });
    }
  }
);

courseController.get("/", authentication, async (req, res) => {
  try {
    const { category, type } = req.query;
    console.log(category, type);

    let aggregationPipeline = [];

    if (category && type) {
      aggregationPipeline.push({
        $match: {
          $and: [{ category: { $in: category } }, { type: { $in: type } }]
        }
      });
    } else if (category) {
      aggregationPipeline.push({
        $match: {
          $and: [{ category: { $in: category } }]
        }
      });
    } else if (type) {
      aggregationPipeline.push({
        $match: {
          $and: [{ type: { $in: type } }]
        }
      });
    }

    let allCourses;
    if (aggregationPipeline.length !== 0) {
      allCourses = await Course.aggregate(aggregationPipeline);
    } else {
      allCourses = await Course.find();
    }
    
    res.status(200).send({ courses: allCourses });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong. Please Try Again" });
  }
});

courseController.patch(
  "/update/:courseId",
  authentication,
  authorization(["admin"]),
  async (req, res) => {
    try {
      const { courseId } = req.params;
      await Course.findByIdAndUpdate({ _id: courseId }, { ...req.body });
      res.status(200).send({ message: "Updated Course Details Successfully" });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Something went wrong. Please Try Again" });
    }
  }
);

courseController.delete(
  "/remove/:courseId",
  authentication,
  authorization(["admin"]),
  async (req, res) => {
    try {
      const { courseId } = req.params;
      await Course.findByIdAndDelete({ _id: courseId });
      res.status(200).send({ message: "Course Removed Successfully" });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Something went wrong. Please Try Again" });
    }
  }
);

module.exports = { courseController };

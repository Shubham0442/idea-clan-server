const { Router } = require("express");
const { authentication } = require("../middlewares/authentication");
const { MyCourse } = require("../models/myCourse.model");

const myCourseController = Router();

myCourseController.get("/:userId", authentication, async (req, res) => {
  try {
    const { userId } = req.params;
    const myCourses = await MyCourse.find({ userId });
    res.status(200).send({ myCourses });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

myCourseController.post("/new", authentication, async (req, res) => {
  try {
    const course = await MyCourse.findOne({
      userId: req.body.userId,
      course_name: req.body.course_name
    });

    if (course) {
      res.status(409).send({ message: "Course already Selected!" });
    } else {
      const myNewCourse = new MyCourse(req.body);
      await myNewCourse.save();
      res.status(200).send({ message: "Course Selected" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "Fail to Select Course!" });
  }
});

myCourseController.delete(
  "/remove/:courseId",
  authentication,
  async (req, res) => {
    try {
      const { courseId } = req.params;
      await MyCourse.findByIdAndDelete({
        _id: courseId,
        userId: req?.body?.userId
      });
      res.status(200).send({ message: "Course Removed" });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

module.exports = { myCourseController };

const mongoose = require("mongoose");

const myCourseSchema = mongoose.Schema({
  userId: { type: String, required: true },
  course_name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  prerequisites: { type: String, required: true },
  userId: { type: String, required: true },
  created_at: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true }
});

const MyCourse = mongoose.model("mycourses", myCourseSchema);

module.exports = { MyCourse };

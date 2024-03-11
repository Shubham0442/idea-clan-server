const mongoose = require("mongoose");

const contentSchema = mongoose.Schema({
  content_name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["lecture", "notes"],
    default: "student"
  },
  course_name: { type: String, required: true },
  lecture_link: { type: String },
  duration: { type: Number },
  reference_url: { type: String },
  courseId: { type: String, required: true },
  created_at: { type: String, required: true },
  description: { type: String, required: true }
});

const Content = mongoose.model("content", contentSchema);

module.exports = { Content };

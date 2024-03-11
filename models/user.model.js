const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, required: true },
  active: { type: Boolean, required: true },
  mobile: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "student"],
    default: "student"
  },
  courses: { type: Array }
});

const User = mongoose.model("user", userSchema);

module.exports = { User };

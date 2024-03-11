const { User } = require("../models/user.model");

const authorization = (roles) => async (req, res, next) => {
  const permittedRoles = roles;
  const { userId } = req.body;

  const user = await User.findOne({ _id: userId });

  if (permittedRoles.includes(user?.role)) {
    next();
  } else {
    res.status(401).send({ msg: "you are not authorized" });
  }
};

module.exports = { authorization };

const User = require("../model/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const auth = {};

auth.register = async (userDetails) => {
  let email = userDetails.email;

  let password = userDetails.password;

  let role = userDetails.role;

  const hashedPassword = await bcrypt.hash(password, 10);

  userDetails.password = hashedPassword;

  const user = await User.create({ email, password: hashedPassword, role });

  const token = jwt.sign(
    {
      userId: user._id,

      email: user.email,

      role: user.role,
    },

    "1234568",
    { expiresIn: "2h" }
  );

  return { message: "User registred Successfully", token };
};

auth.login = async (userDetails) => {
  try {
    let email = userDetails.email;

    let password = userDetails.password;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      "1234568",
      { expiresIn: "2h" }
    );

    return { token, User };
  } catch (error) {}
};

module.exports = auth;

const User = require('../db/User');
const bcrypt = require("bcrypt");


exports.createUser = async function(newUser) {
    try {
        const user = new User(newUser);
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};
exports.signinUser = async (email, password) => {
  const teacher = await User.findOne({ email, role: "teacher" });

  if (!teacher) throw new Error("Teacher not found");

  const match = await bcrypt.compare(password, teacher.password);
  if (!match) throw new Error("Invalid password");

  return teacher;
};
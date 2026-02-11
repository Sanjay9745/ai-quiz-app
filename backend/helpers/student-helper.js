const User = require('../db/User');
const bcrypt = require("bcrypt");


exports.createStudent = async (studentData) => {
    try {
        const newStudent = new User(studentData);
        return await newStudent.save();


    }catch (error) {
        throw new Error('Error creating student: ' + error.message);

    }
};

exports.authenticateStudent = async (email, password) => {
  const student = await User.findOne({ email, role: "student" });

  if (!student) throw new Error("Student not found");

  const match = await bcrypt.compare(password, student.password);
  if (!match) throw new Error("Invalid password");

  return student;
};
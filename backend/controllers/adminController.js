const User = require("../db/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Admin Registration
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      passwordHash: hashedPassword,
      role: "admin",
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, role: "admin" });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.json({ token, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createTeacher = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(404).json({ message: "required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(404).json({ message: "Already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      passwordHash: hashedPassword,
      role: "teacher",
    });
    await user.save();
    res.status(201).json({ message: "Teacher created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await User.findOne({
      _id: id,
      role: "teacher",
    }).select("-passwordHash");

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ teacher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.listTeachers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const query = { role: "teacher" };

    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
      select: "-password",
    };

    const result = await User.paginate(query, options);

    res.status(200).json({
      teachers: result.docs,
      pagination: {
        total: result.totalDocs,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, oldPassword, newPassword } = req.body;

    const teacher = await User.findOne({ _id: id, role: "teacher" });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (username) teacher.username = username;
    if (email) teacher.email = email;

    if (oldPassword || newPassword) {
      if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Both passwords are required" });
      }

      const isMatch = await bcrypt.compare(oldPassword, teacher.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password" });
      }

      teacher.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    await teacher.save();
    res.status(200).json({ message: "Teacher updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await User.findOneAndDelete({ _id: id, role: "teacher" });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

var express = require("express");
var router = express.Router();
const controller = require("../controllers/adminController");
const { authMiddleware, roleMiddleware } = require("../middleware/auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/register", controller.register);
router.post("/login", controller.login);

// admin/teachers
router.post(
  "/teachers",
  authMiddleware,
  roleMiddleware("admin"),
  controller.createTeacher,
);
router.get(
  "/teachers/:id",
  authMiddleware,
  roleMiddleware("admin"),
  controller.getTeacherById,
);
router.get(
  "/teachers",
  authMiddleware,
  roleMiddleware("admin"),
  controller.listTeachers,
);
router.patch(
  "/teachers/:id",
  authMiddleware,
  roleMiddleware("admin"),
  controller.updateTeacher,
);
router.delete(
  "/teachers/:id",
  authMiddleware,
  roleMiddleware("admin"),
  controller.removeTeacher,
);

module.exports = router;

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { errorHandler } = require("../utils/error");
const { registerValidator } = require("../validations/auth");

const signup = async (req, res, next) => {
  // 1. Validation (bao gồm cả kiểm tra email đã tồn tại)
  const { error } = registerValidator(req.body);
  if (error) {
    console.log(error.details.map((e) => e.message));
    const errorDetails = error.details;

    // Kiểm tra lỗi cho từng trường cụ thể và trả về thông báo tùy chỉnh
    for (const detail of errorDetails) {
      if (detail.path[0] === "username") {
        return res.status(422).json({
          error: "ValidationError",
          field: "username",
          message: "Tên người dùng không hợp lệ.", // Thông báo tùy chỉnh
        });
      } else if (detail.path[0] === "password") {
        return res.status(422).json({
          error: "ValidationError",
          field: "password",
          message: "Mật khẩu không hợp lệ.", // Thông báo tùy chỉnh
        });
      } else if (detail.path[0] === "email") {
        return res.status(422).json({
          error: "ValidationError",
          field: "email",
          message: "Email không hợp lệ.", // Thông báo tùy chỉnh
        });
      }
    }
  }

  try {
    // 2. Kiểm tra xem email đã tồn tại chưa (trong khối try...catch)
    const checkEmailExist = await User.findOne({ email: req.body.email });
    if (checkEmailExist) {
      return res.status(422).json({
        error: "EmailAlreadyExists",
        message: "Email đã tồn tại.",
      });
    }

    // 3. Tiếp tục xử lý nếu không có lỗi
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    const newUser = await user.save();
    await res.send(newUser);
  } catch (err) {
    console.error(err); // Ghi log lỗi
    res.status(500).json({
      error: "InternalServerError",
      message: "Đã xảy ra lỗi trong quá trình xử lý.",
    });
  }
};

module.exports = { signup };

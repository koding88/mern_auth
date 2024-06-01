const { errorhandler } = require("../utils/error");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const test = (req, res) => {
    res.json({
        message: "API is working",
    });
};

// Update User
const updateUser = async (req, res, next) => {
    console.log("test: ", req.user.id, req.params.id, req.body);
    if (req.user.id !== req.params.id) {
        return next(errorhandler(401, "You can update only your account!"));
    }
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

module.exports = { test, updateUser };

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 6,
            max: 255,
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 225,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 255,
        },
        profilePicture: {
            type: String,
            default:
            "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

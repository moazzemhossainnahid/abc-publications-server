const mongoose = require("mongoose");
const validator = require("validator");


const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            minLength: [10, "Titile must be at least 3 characters."],
            maxLength: [150, "Titile is too large"],
        },
        category: {
            type: String,
            trim: true,
            minLength: [3, "Category must be at least 3 characters."],
            maxLength: [10, "Category is too large"],
        },
        subCategory: {
            type: Array,
            trim: true,
            minLength: [3, "subCategory must be at least 3 characters."],
            maxLength: [100, "subCategory is too large"],
        },
        description: {
            type: String,
            trim: true,
        },
        authorName: {
            type: String,
            trim: true,
            minLength: [3, "authorName must be at least 3 characters."],
            maxLength: [100, "authorName is too large"],
        },
        authorEmail: {
            type: String,
            validate: [validator.isEmail, "Provide a valid Email"],
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, "authorEmail address is required"],
        },
        status: {
            type: String,
            default: "upapprove",
            enum: ["approve", "unapprove"],
        },
        authorAvatar: {
            type: String,
            trim: true,
        },
        cover: {
            type: String,
            trim: true,
        },
        createdAt: {
            type: String,
            trim: true,
        },

    },
    {
        timestamps: true,
    }

);


const Posts = mongoose.model("posts", postSchema);

module.exports = Posts;
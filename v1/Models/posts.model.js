const mongoose = require("mongoose");
const validator = require("validator");


const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            unique: true,
            required: [false, "title is required"],
            minLength: [1, "Titile must be at least 3 characters."],
            maxLength: [150, "Titile is too large"],
        },
        category: {
            type: String,
            trim: true,
            minLength: [1, "Category must be at least 3 characters."],
            maxLength: [20, "Category is too large"],
        },
        subCategory: {
            type: Array,
            trim: true,
            minLength: [1, "subCategory must be at least 3 characters."],
            maxLength: [100, "subCategory is too large"],
        },
        description: {
            type: String,
            required: [false, "Description is required"],
            trim: true,
        },
        authorName: {
            type: String,
            trim: true,
            required: [false, "authorName is required"],
            minLength: [1, "authorName must be at least 3 characters."],
            maxLength: [100, "authorName is too large"],
        },
        authorEmail: {
            type: String,
            trim: true,
            required: [false, "authorMail is required"],
            minLength: [3, "authorMail must be at least 3 characters."],
            maxLength: [100, "authorMail is too large"],
        },
        status: {
            type: String,
            default: "unapprove",
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
        resource: {
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
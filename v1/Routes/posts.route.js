const express = require("express");
const postController = require("../Controllers/posts.controller");
const verifyToken = require("../Middlewares/verifyToken");
const uploader = require("../Middlewares/Uploader");
const multer  = require('multer')
const router = express.Router();

// publish a post
router.post("/", postController.publishAPost);

// get all posts
router.get("/", postController.getAllPosts);

// get single post
router.get("/:id", postController.getSinglePost);

// delete a post
router.delete("/:id", postController.deleteAPost);

// approve a post
router.put("/:id", postController.approveAPost);



module.exports = router;
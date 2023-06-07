const express = require("express");
const Posts = require('../Models/posts.model');
require('dotenv').config();



// publish a post
exports.publishAPost = async (req, res) => {
    try {
        const resource = req.file ? req.file.filename : null;
        const { title, category, subCategory, authorName, authorAvatar, authorEmail, description, createdAt, cover, } = req.body;
        // console.log(req.file);
        // console.log(req.body);
        const posts = await Posts.create({ title, category, subCategory, authorName, authorAvatar, authorEmail, description, createdAt, cover, resource });
        res.status(200).json({
            status: "Successful",
            message: "Data added successfully",
            data: posts
        });
    } catch (error) {
        res.json(error);
    }
}


// get single post
exports.getSinglePost = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: id }
        const post = await Posts.findOne(query);
        return res.status(200).json(post);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

// get all posts
exports.getAllPosts = async (req, res) => {
    const query = {};
    const posts = await Posts.find(query);
    res.send(posts)
}


// delete a pst
exports.deleteAPost = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const query = { _id: id };
        // console.log(query);
        const result = await Posts.deleteOne(query);
        res.send(result)
    } catch (err) {
        res.status(404).json(err);
    }
}


// approve a post
exports.approveAPost = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const filter = { _id: id };
        const options = { upsert: true };
        const updateDoc = {
            $set: { status: 'approve' }
        };
        const result = await Posts.updateOne(filter, updateDoc, options);
        res.send(result);
    } catch (err) {
        res.status(404).json(err);
    }
}


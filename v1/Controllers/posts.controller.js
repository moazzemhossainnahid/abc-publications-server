const express = require("express");
const Posts = require('../Models/posts.model');
require('dotenv').config();



// publish a post
exports.publishAPost = async (req, res) => {
    try {
        const data = req.body;
        // console.log(data);
        const posts = await create(data);
        console.log(posts);
        res.status(200).json({
            status: "Successful",
            message: "Data added successfully",
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
        const user = await Posts.findOne(query);
        return res.status(200).json(user);
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
        console.log(id);
        const query = { _id: id };
        console.log(query);
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


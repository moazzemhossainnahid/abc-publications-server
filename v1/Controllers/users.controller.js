const express = require("express");
const Users = require('../Models/users.model');

// post user by email
exports.postAnUser = async (req, res) => {
    try {
        const email = req.params.email;
        const user = req.body;
        const filter = { email: email };
        const options = { upsert: true };
        const updateDoc = {
            $set: user
        };
        const result = await Users.updateOne(filter, updateDoc, options);
        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        // res.send({ result, accessToken: token });

        res.status(200).json({
            status: "success",
            message: "Successfully logged in",
            data: {
                user: result,
                token,
            },
        });
    } catch (err) {
        res.status(404).json(err);
    }
}


// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const query = {};
        const cursor = Users.find(query);
        const users = await cursor.toArray();
        res.send(users)
    } catch (err) {
        res.status(404).json(err);
    }
}


// delete an user
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await Users.deleteOne(query);
        res.send(result)
    } catch (err) {
        res.status(404).json(err);
    }
}


// make admin by email
exports.makeAdmin = async (req, res) => {
    try {
        const email = req.params.email;
        const filter = { email: email };
        const options = { upsert: true };
        const updateDoc = {
            $set: { role: 'admin' }
        };
        const result = await Users.updateOne(filter, updateDoc, options);
        res.send(result);
    } catch (err) {
        res.status(404).json(err);
    }
}


//get admin api 
exports.getAdmin = async (req, res) => {
    try {
        const email = req.params.email;
        const query = { email: email }
        const adminUser = await Users.findOne(query);
        const isAdmin = adminUser.role === "admin"
        res.send({ role: isAdmin })
    } catch (err) {
        res.status(404).json(err);
    }
}


// remove admin by email
exports.removeAdmin = async (req, res) => {
    try {
        const email = req.params.email;
        const filter = { email: email };
        const options = { upsert: true };
        const updateDoc = {
            $set: { role: '' }
        };
        const result = await Users.updateOne(filter, updateDoc, options);
        res.send(result);
    } catch (err) {
        res.status(404).json(err);
    }
}


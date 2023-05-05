const mongoose = require("mongoose");
var validator = require("validator");

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        // required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"],
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    img: {
        
        type: String,
        validate: [validator.isURL, "Please provide an URL"],
    },
    profession: {
        // required: true,
        type: String,
    },
    gender: {
        // required: true,
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "{VALUE} isn't valid. please select 'male', 'female', or 'other' ",
        },
    },
    phone: {
        // required: true,
        type: String,
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value, ["bn-BD"]);
            },
        },
        maxLength: 14,
        minLength: 14,
    },
    role: {
        // required: true,
        type: String,
        enum: {
            values: ["admin", "moderator", "user"],
            message: "{VALUE} is wrong. must be admin/moderator/user"
        }
    },
    status: {
        // required: true,
        type: String,
        enum: {
            values: ["active", "blocked"],
            message: "{VALUE} is wrong. must be active/blocked"
        }
    }
}, {
    timestamps: true
});

const Users = mongoose.model("users", usersSchema);

module.exports = Users;
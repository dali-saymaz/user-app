const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    first_name: {
        type: String,
        default: null,
        required: 'First name is required',
        trim: true
    },
    last_name: {
        type: String, default: null,
        required: 'Last name is required',
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String, required: 'Password is required',
    },
    token: { type: String },
});

module.exports = mongoose.model("auth", authSchema);
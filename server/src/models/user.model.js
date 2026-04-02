const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
        sparse: true          // ← THIS IS THE MOST IMPORTANT LINE
    },
    username: {
        type: String,
        
        required: function() {
            return !this.googleId;     // Required only for normal users
        }
    },
    email: {
        type: String,
        unique: [true, "Account already exists with this email address"],
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId;     // Not required for Google users
        }
    },
    name: {
        type: String
    },
    picture: {
        type: String
    },
    isGoogleUser: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true 
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
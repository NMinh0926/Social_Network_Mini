import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile:{
        bio: {
            type: String,
            default: "" 
        },
        avatar: {
            type: String,
            default: "default-avatar.png" 
        },
        display_name:{
            type: String,
            default: ""
        },

    },
    stats:{
        followers_count: {
            type: Number,
            default: 0
        },
        following_count: {
            type: Number,
            default: 0
        },
        posts_count: {
            type: Number,
            default: 0
        }
    },
    is_active:{
        type: Boolean,
        default: true
    },
    timestamps: true // Automatically adds createAt and updateAt fields
})

const User = mongoose.model("User", UserSchema);

export default User;
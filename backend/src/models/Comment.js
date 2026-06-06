import mongoose from "mongoose";
import Like from "./Like";

const CommentSchema = new mongoose.Schema({
    post_id:{
        type: mongoose.Schema.Types.ObjectId, ref:"Post",
        required: true
    },
    auth_id:{
        type: mongoose.Schema.Types.ObjectId, ref:"User",
        required: true
    },
    content:{
        type: String,
        required: true
    },
    parent_id:{
        type: mongoose.Schema.Types.ObjectId, ref:"Comment",
        default: null
    },
    likes_count:{
        type: Number,
        default: 0
    },
    createAt:{
        type: Date,
        default: Date.now
    }

})

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
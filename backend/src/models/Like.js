import mongoose from "mongoose";

const LikeSchema = mongoose.Schema({
    target_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "target_types"
    },
    target_types:{
        type: String,
        enum: ["Post", "Comment"],
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId, ref:"User",
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now
    }
})

// Ensure a user can like a specific target only once
LikeSchema.index({ target_id: 1, user_id: 1, target_types: 1 }, { unique: true }); 

const Like = mongoose.model("Like", LikeSchema);

export default Like;
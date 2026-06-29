import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        author_id:{
            type:mongoose.Schema.Types.ObjectId, ref:"User",
            required:true
        },
        content:{
            type:String,
            required:true
        },
        media:[{
            type:String
        }],
        stats:{
            likes_count:{
                type:Number,
                default:0
            },
            comments_count:{
                type:Number,
                default:0
            }
        },
        visibility:{
            type:String,
            enum:["public","private","friends"],
            default:"public"
        }, 
    },
    {timestamps:true}
)

const Post = mongoose.model("Post",postSchema);

export default Post;
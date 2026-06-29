import Follow from '../models/Follow.js';
import Like from '../models/Like.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

export const toggleFollow = async (req, res) => {
    const targetId = req.params.id; // Người được follow
    const myId = req.user.id;      // Chính mình

    if (targetId === myId) return res.status(400).json("You cannot follow yourself");

    try {
        const existingFollow = await Follow.findOne({ 
            follower_id: myId, 
            following_id: targetId 
        });

        if (existingFollow) {
            await Follow.findByIdAndDelete(existingFollow._id);
      
            await User.findByIdAndUpdate(myId, { $inc: { "stats.following_count": -1 } });
            await User.findByIdAndUpdate(targetId, { $inc: { "stats.follower_count": -1 } });

            res.status(200).json({ followed: false, message: "Unfollowed" });
        } else {
      
            const newFollow = new Follow({
                follower_id: myId,
                following_id: targetId
            });
            await newFollow.save();

            await User.findByIdAndUpdate(myId, { $inc: { "stats.following_count": 1 } });
            await User.findByIdAndUpdate(targetId, { $inc: { "stats.follower_count": 1 } });

            res.status(200).json({ followed: true, message: "was followed" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const toggleLike = async (req, res) => {
    try {
        const { target_id, target_types } = req.body; // target_types là "Post" hoặc "Comment"
        const user_id = req.user.id;

        const existingLike = await Like.findOne({ target_id, user_id, target_types });

        if (existingLike) {
      
            await Like.findByIdAndDelete(existingLike._id);

            const Model = target_types === "Post" ? Post : Comment;
            await Model.findByIdAndUpdate(target_id, { $inc: { "stats.likes_count": -1 } });

             return res.status(200).json({ liked: false, message: "Has unlike" });
        } else {
            const newLike = new Like({
                target_id,
                target_types,
                user_id
            });
            await newLike.save();

      
            const Model = target_types === "Post" ? Post : Comment;
            await Model.findByIdAndUpdate(target_id, { $inc: { "stats.likes_count": 1 } });

            return res.status(200).json({ liked: true, message: "Đã thích" });
        }
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json("You have liked this before");
        }
        res.status(500).json({ message: "System error", error: err });
    }
};


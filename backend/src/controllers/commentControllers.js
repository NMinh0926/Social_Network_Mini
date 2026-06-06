import Follow from '../models/Follow.js';
import Like from '../models/Like.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export const createComment = async (req, res) => {
  try {
    const { post_id, content, parent_id } = req.body;
    const auth_id = req.user.id;

    const newComment = new Comment({
      post_id,
      auth_id,
      content,
      parent_id: parent_id || null
    });

    const savedComment = await newComment.save();

    if (!parent_id) {
      await Post.findByIdAndUpdate(post_id, { $inc: { "stats.comment_count": 1 } });
    }

    const result = await savedComment.populate("auth_id", "username profile.avatar");
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const { parent_id } = req.query; 
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Mặc định 10 comment mỗi lần load
    const skip = (page - 1) * limit;

    const query = { 
      post_id: postId, 
      parent_id: parent_id || null 
    };

    const comments = await Comment.find(query)
      .populate("auth_id", "username profile.avatar")
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalComments = await Comment.countDocuments(query);

    res.status(200).json({
      data: comments,
      pagination: {
        total: totalComments,
        page,
        limit,
        totalPages: Math.ceil(totalComments / limit),
        hasNextPage: skip + comments.length < totalComments
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments", error: err });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params; 
    const { content } = req.body;
    const userId = req.user.id;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.auth_id.toString() !== userId) {
      return res.status(403).json({ message: "You do not have permission to update this comment" });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { 
        $set: { content: content } 
      },
      { new: true }
    ).populate("auth_id", "username profile.avatar");

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ message: "Failed to update comment", error: err });
  }
};
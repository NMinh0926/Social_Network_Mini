import Post from '../models/Post.js';
import User from '../models/User.js'

export const getNewsfeed = async (req, res) => {
    try {
        const myId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Get the list of users the current user is following
        const following = await User.findById(myId).select('following').lean();
        const followingIds = following.following.map(f => f.toString());

        // Include the current user's own ID to get their posts as well
        followingIds.push(myId);
        
        // Fetch posts from the users the current user is following, sorted by creation date
        const posts = await Post.find({ author: { $in: followingIds } })
            .sort({ createAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('author', 'username profile.display_name profile.avatar');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const createPost = async (req, res) => {
  try {
    const { content, media, visibility } = req.body;
    const userId = req.user.id;

    const newPost = new Post({
      author_id: userId,
      content,
      media,
      visibility: visibility || 'public'
    });

    const savedPost = await newPost.save();
    
    await User.findByIdAndUpdate(userId, { $inc: { "stats.post_count": 1 } });

    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: "Cannot create post", error: err });
  }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username profile.display_name profile.avatar');
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id; // take user id from auth middleware
    const { content, media, visibility } = req.body;

    
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the current user is the author of the post
    if (post.author_id.toString() !== userId) {
      return res.status(403).json({ message: "You do not have permission to edit this post" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { 
        $set: { 
          content: content || post.content,
          media: media || post.media,
          visibility: visibility || post.visibility
        } 
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (post.author_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not the owner of this post" });
    }

    await post.deleteOne();
    
    await User.findByIdAndUpdate(req.user.id, { $inc: { "stats.post_count": -1 } });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err });
  }
};
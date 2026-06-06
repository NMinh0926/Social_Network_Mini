import User from '../models/User.js';
import Follow from '../models/Follow.js';

export const getUsers = async (req, res) => {
    try{
        const users = await User.find().select('-password');
        res.status(200).json(users);
    }
    catch{
        res.status(500).json({message: 'Cannot get users'});
    }
}

// get user profile by id
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('username profile stats'); 
    
    if (!user) return res.status(404).json("Cannot find user");

    // Check if the requesting user is following the profile user
    const isFollowing = await Follow.exists({
      follower_id: req.user.id,
      following_id: req.params.id
    });

    res.status(200).json({ user, isFollowing: !!isFollowing });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUser = async (req, res) => {
    try {
    const { display_name, avatar, bio } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          "profile.display_name": display_name,
          "profile.avatar": avatar,
          "profile.bio": bio
        }
      },
      { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const findUserByUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const users = await User.find({ username: { $regex: username, $options: 'i' } })
      .select('username profile');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getFollowers = async (req, res) => {
  try{
    const followers = await Follow.find({ following_id: req.params.id })
      .populate('follower_id', 'username profile.display_name profile.avatar')
      .select('follower_id createdAt');
    res.status(200).json(followers.map(f => f.follower_id));
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getFollowing = async (req, res) => {
  try{
    const following = await Follow.find({ follower_id: req.params.id })
      .populate('following_id', 'username profile.display_name profile.avatar')
      .select('following_id createdAt');
    res.status(200).json(following.map(f => f.following_id));
  } catch (err) {
    res.status(500).json(err);
  }
}
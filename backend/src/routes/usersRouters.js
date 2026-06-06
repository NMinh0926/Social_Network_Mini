import express from "express";
import {getUsers, getUserProfile, updateUser, findUserByUsername, getFollowers, getFollowing} from "../controllers/usersControllers.js";

const router = express.Router();

// Get all users
router.get("/users", getUsers);

// Get user profile by id
router.get("/users/:id", getUserProfile);

// Update user profile
router.put("/users/profile", updateUser);

// Search users by username
router.get("/users/search", findUserByUsername);

// Get followers of a user
router.get("/users/:id/followers", getFollowers);

// Get following of a user
router.get("/users/:id/following", getFollowing);

export default router;
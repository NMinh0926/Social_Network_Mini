import {toggleFollow, toggleLike} from '../controllers/interactionControllers.js';
import express from "express";

const router = express.Router();

// Toggle follow/unfollow a user
router.post('/follow/:id', toggleFollow);   

// Toggle like/unlike a post or comment
router.post('/likes/toggle', toggleLike);

export default router;
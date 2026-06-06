import {createComment, getComments, updateComment} from '../controllers/commentControllers.js';
import express from "express";

const router = express.Router();

// Create a new comment
router.post('/comments', createComment);

// Get comments for a post, with optional parent_id to get replies
router.get('/post/:postId/comments', getComments);

// Update a comment
router.put('/comments/:id', updateComment);

export default router;
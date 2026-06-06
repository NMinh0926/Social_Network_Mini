import express from "express";
import { getNewsfeed,getPostById, createPost, updatePost, deletePost} from "../controllers/postsControllers.js";

const router = express.Router();

//Get feed from following
router.get("/posts/feed", getNewsfeed);

//Get post by id
router.get("/posts/:id", getPostById);

//Create a new post
router.post("/posts", createPost);

//Update a post
router.put("/posts/:id", updatePost);

//Delete a post
router.delete("/posts/:id", deletePost);

export default router;
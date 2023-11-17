import express from "express";
import { getPosts, addPost, deletePost, completedPost, getResolvedPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/resolved", getResolvedPosts);
router.get("/", getPosts);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.post("/:id/complete", completedPost); // Use POST and specify the endpoint
export default router;

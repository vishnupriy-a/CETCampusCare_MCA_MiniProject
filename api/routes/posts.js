import express from "express";
import { getPosts, addPost, deletePost, completedPost, getResolvedPosts,getUserPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/resolved", getResolvedPosts);
router.get("/profile/5", getUserPosts);
router.get("/", getPosts);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.post("/:id/complete", completedPost); // Use POST and specify the endpoint
export default router;

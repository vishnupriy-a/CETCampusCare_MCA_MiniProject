import express from "express";
import { getResolvedPosts } from "../controllers/resolvedpost.js";

const router = express.Router();

router.get("/", getResolvedPosts);
export default router;

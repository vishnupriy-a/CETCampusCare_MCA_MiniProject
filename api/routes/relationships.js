import express from "express";
import { getRelationships, addRelationship, deleteRelationship } from "../controllers/relationship.js";
// import { getUserPosts } from "../controllers/post.js";

const router = express.Router()

router.get("/", getRelationships)
// router.get("/", getUserPosts)
router.post("/", addRelationship)
router.delete("/", deleteRelationship)


export default router
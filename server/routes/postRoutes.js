import express from "express";
import {
  createPost,
  getPosts,
  deletePost
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const postRoutes = express.Router();

postRoutes.post("/create", protect, createPost);
postRoutes.get("/", getPosts);
postRoutes.delete("/:id", protect, deletePost);

export default postRoutes;


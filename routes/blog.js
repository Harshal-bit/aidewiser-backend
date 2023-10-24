import { Router } from "express";
import { addblog, findAllBlogs, findBlogbyId,addComment } from "../controllers/blog.js";

const blogRoutes = Router();

blogRoutes.post('/add-blog',addblog);
blogRoutes.get('/blogs',findAllBlogs);
blogRoutes.get('/blogs/:id',findBlogbyId);
blogRoutes.post('/blogs/:id/comment',addComment);

export default blogRoutes;
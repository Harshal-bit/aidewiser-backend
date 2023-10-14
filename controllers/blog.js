import Blog from "../models/Blog.js";

export const addblog = async (req,res) => {
    try {
        const {title,imgsrc,content} = req.body;
        const newBlog = new Blog({
            title,
            imgsrc,
            content,
        })

        const savedBlog = await newBlog.save();
        res.status(200).json(
            {
                data : savedBlog,
                message : "blog saved",
            }
            );
        
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const findBlogbyId = async (req, res) => {
    try {
        const id = await req.params.id;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);

    } catch (error) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

export const findAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find(); // Find all blog posts in the database
    
        if (!blogs || blogs.length === 0) {
          return res.status(404).json({ message: "No blogs found" });
        }
    
        res.json(blogs);
      } catch (error) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

export const addComment = async (req, res) => {
    try {
        console.log("addComent route hit")
        console.log(req.body);
        const id = await req.params.id;
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json({ message: "Blog not found" });
        }
        const { name, email, comment } = req.body;
        if (!name || !email || !comment) {
            return res.status(400).json({ message: 'Incomplete comment data' });
        }

        blog.comment.push({ name, email, comment });
        const savedComment = await blog.save();
        console.log(savedComment)
        return res.status(201).json(savedComment);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    
}
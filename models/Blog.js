import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
{
    title: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    imgsrc: {
      type: String,
      required: true,
    },

    content: {
      type: Array,
      required: true,
    },
    comment: {
      type: Array,
      required: true,
    },
},
  { timestamps: true}
);

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;

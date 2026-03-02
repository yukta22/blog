import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  console.log("req.body",req.body)
  const { title, content, tags } = req.body;

  const post = await Post.create({
    title,
    content,
    tags,
    username: req.user.username,
    user: req.user._id,
  });

  res.status(201).json(post);
};

export const getPosts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const search = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { tags: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const posts = await Post.find(search)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(search);

  res.json({
    posts,
    page,
    pages: Math.ceil(total / limit),
  });
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this post");
  }

  await post.deleteOne();
  res.json({ message: "Post deleted successfully" });
};

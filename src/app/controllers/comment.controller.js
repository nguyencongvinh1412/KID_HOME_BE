const commentService = require("../services/comment.service");

const commentController = {
  getAllComment: async (req, res) => {
    try {
      const blogId = req.params.blogId;
      const [comments, total] = await commentService.getAllComment({ blogId });
      return res
        .status(200)
        .json({ message: "Successfully", result: {comments, total} });
    } catch (error) {
      return res.status(400).json({ message: error.message, data: error });
    }
  },
  addComment: async (req, res) => {
    try {
        const data = req.body;
        const author = req.user._id;
        const commentObject = {
            ...data,
            author,
        }
        const comment = await commentService.addComment(commentObject);
        return res.status(201).json({message: "Successfully", result: comment});
    } catch (error) {
        return res.status(400).json({message: error.message, data: error});
    }
  }
};

module.exports = commentController;

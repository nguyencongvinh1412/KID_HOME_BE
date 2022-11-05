const commentModel = require("../models/comment.model");
const ObjectId = require("mongoose").Types.ObjectId;
const dateFns = require("date-fns");

const commentService = {
  getAllComment: async (data) => {
    try {
      const { blogId } = data;
      const comments = await commentModel
        .find({ blog: ObjectId(blogId) })
        .populate("author");

      const total = comments.length;

      return [comments, total];
    } catch (error) {
      throw new Error(error);
    }
  },
  addComment: async (data) => {
    try {
        let comment = new commentModel(data);
        comment = await comment.save();
        comment = await commentModel.findOne({_id: comment._id})
            .populate("author");
        return comment;
    } catch (error) {
        throw new Error(error);
    }
  }
};

module.exports = commentService;

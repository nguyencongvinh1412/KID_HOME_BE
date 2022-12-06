const blogModel = require("../models/blog.model");
const ObjectId = require("mongoose").Types.ObjectId;
const imageModel = require("../models/image.model");
const dateFns = require("date-fns");

const blogService = {
  createByCentreAdmin: async (data) => {
    try {
      const blogEntity = new blogModel(data);
      return blogEntity.save();
    } catch (error) {
      throw new Error(error);
    }
  },

  getManyByCentreAdmin: async (data) => {
    try {
      let { limit = 10, page = 1, authorId } = data;
      limit = Number.parseInt(limit);
      page = Number.parseInt(page);
      const skip = (page - 1) * limit;
      const blogs = await blogModel
        .find({ author: ObjectId(authorId) })
        .skip(skip)
        .limit(limit)
        .populate("author")
        .populate("centre");

      let blogsShow = [];
      for (const blog of blogs) {
        const image = await imageModel.find({ targetId: blog._id });
        blogsShow.push({
          ...blog._doc,
          image,
        });
      }
      const total = blogsShow.length;
      return [blogsShow, total];
    } catch (error) {
      throw new Error(error);
    }
  },

  getDetailByCentreAdmin: async (blogId) => {
    try {
      const blog = await blogModel.findOne({ _id: blogId }).populate("author");

      const image = await imageModel.findOne({ targetId: blog._id });
      return {
        ...blog._doc,
        createdAt: dateFns.format(blog._doc.createdAt, "LLLL dd yyyy"),
        image,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  getManyBelongCentre: async (data) => {
    try {
      let { limit = 3, centreId } = data;
      limit = Number.parseInt(limit);
      const blogs = await blogModel
        .find({ centre: ObjectId(centreId) })
        .populate("author")
        .populate("centre")
        .sort({ createdAt: -1 })
        .limit(limit);

      let blogsShow = [];
      for (const blog of blogs) {
        const image = await imageModel.find({ targetId: blog._id });
        blogsShow.push({
          ...blog._doc,
          createdAt: dateFns.format(blog._doc.createdAt, "LLLL dd yyyy"),
          image,
        });
      }
      const total = blogsShow.length;
      return [blogsShow, total];
    } catch (error) {
      throw new Error(error);
    }
  },

  getDetailByParent: async (blogId) => {
    try {
      const blog = await blogModel.findOne({ _id: blogId }).populate("author");

      const image = await imageModel.findOne({ targetId: blog._id });
      return {
        ...blog._doc,
        createdAt: dateFns.format(blog._doc.createdAt, "LLLL dd yyyy"),
        image,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  getManyBlogsBelongBlog: async (blogId) => {
    try {
      const blog = await blogModel.findOne({ _id: blogId }).populate("centre");

      const blogs = await blogModel
        .find({
          centre: ObjectId(blog.centre._id),
          _id: { $ne: ObjectId(blogId) },
        })
        .populate("author")
        .populate("centre")
        .sort({ createdAt: -1 })
        .limit(3);

      let blogsShow = [];
      for (const blog of blogs) {
        const image = await imageModel.findOne({ targetId: blog._id });
        blogsShow.push({
          ...blog._doc,
          createdAt: dateFns.format(blog._doc.createdAt, "LLLL dd yyyy"),
          image,
        });
      }

      const total = blogsShow.length;
      return [blogsShow, total];
    } catch (error) {
      throw new Error(error);
    }
  },

  getManyBlogByParent: async (data) => {
    try {
        let {limit = 9, page = 1, filter} = data;
        limit = Number.parseInt(limit);
        page = Number.parseInt(page);
        const skip = (page - 1) * limit;
        const [blogs, total] = await Promise.all([
          blogModel.find(filter)
          .populate("centre")
          .populate("author")
          .skip(skip)
          .limit(limit),
          blogModel.find(filter).count(),
        ]);

        let blogsShow = [];

        for (const blog of blogs) {
            const image = await imageModel.findOne({targetId: blog._id});
            blogsShow.push({
                ...blog._doc,
                createdAt: dateFns.format(blog._doc.createdAt, "LLLL dd yyyy"),
                image
            });
        }
        return [blogsShow, total];
    } catch (error) {
        throw new Error(error);
    }
  }
};

module.exports = blogService;

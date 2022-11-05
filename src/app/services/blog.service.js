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
            let {limit = 10, page = 1, authorId } = data;
            limit = Number.parseInt(limit);
            page = Number.parseInt(page);
            const skip = (page - 1) * limit;
            const blogs = await blogModel.find({author: ObjectId(authorId)})
                .skip(skip)
                .limit(limit)
                .populate("author")
                .populate("centre");
            
            let blogsShow = [];
            for(const blog of blogs) {
                const image = await imageModel.find({targetId: blog._id});
                blogsShow.push({
                    ...blog._doc,
                    image
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
            const blog = await blogModel.findOne({_id: blogId})
                .populate("author");

            const image = await imageModel.findOne({targetId: blog._id});
            return {
                ...blog._doc,
                createdAt: dateFns.format(blog._doc.createdAt, "LLLL dd yyyy"),
                image,
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = blogService;
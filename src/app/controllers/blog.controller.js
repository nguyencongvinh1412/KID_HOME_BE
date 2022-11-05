const blogService = require("../services/blog.service");
const formidable = require("formidable");
const uploader = require("../../config/cloudinary/cloudinary");
const imageService = require("../services/image.service");


const blogController = {
    createByCentreAdmin: async (req, res, next) => {
        const form = formidable({multiples: true});
        form.parse(req, async (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }

            try {
                const blogObject = {
                    ...fields,
                    author: req.user._id
                }
                const blog = await blogService.createByCentreAdmin(blogObject);
                let image = {};
                if (files.image) {
                    const {url} = await uploader(files.image.filepath);
                    image = await imageService.addOneImageToCentre({targetId: blog._id, url});
                }

                return res.status(201).json({message: "Successfully", result: {blog, image}});
            } catch (error) {
                return res.status(400).json({ message: error.message, data: error });
            }
        })
    },
    getManyBlogByCentreAdmin: async (req, res) => {
        try {
            const data = req.params;
            const {page = 1, limit = 10} = data;
            const authorId = req.user._id;
            const [blogs, total] = await blogService.getManyByCentreAdmin({page, limit, authorId});
            return res.status(200).json({message: "Successfully", result: {blogs, paging: {total, limit: limit, page: page}}});
        } catch (error) {
            return res.status(400).json({message: error.message, data: error});
        }
    },
    getDetailByCentreAdmin: async (req, res) => {
        try {
            const blogId = req.params.blogId;
            const blog = await blogService.getDetailByCentreAdmin(blogId);
            return res.status(200).json({message: "Successfully", result: blog});
        } catch (error) {
            return res.status(400).json({message: error.message, data: error});
        }
    }
}

module.exports = blogController;
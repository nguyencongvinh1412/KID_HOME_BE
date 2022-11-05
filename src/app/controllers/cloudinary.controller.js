const uploader = require("../../config/cloudinary/cloudinary");
const formidable = require('formidable');

const cloudinaryController = {
    upload: (req, res, next) => {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }

            try {
                const {url} = await uploader(files.file.filepath);
                return res.status(200).json({message: "Successfully", result: url});
            } catch (error) {
                return res.status(500).json({message: error.message, result: error});
            }
        })
    }
}

module.exports = cloudinaryController;
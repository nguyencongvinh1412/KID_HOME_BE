require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const cloudinaryService = {
  upload: (data) => {
    console.log('data', data);
    cloudinary.uploader.upload(`${data}`, {
      resource_type: "image",
    })
    .then((result) => {
      console.log('result',result);
      return result
    })
    .catch((error) => {
      console.log('error', error);
      return error;
    })
  }
}

module.exports = cloudinaryService;
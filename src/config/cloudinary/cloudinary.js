require('dotenv').config()
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRECT_KEY 
  });

const uploader = async (path) => await cloudinary.uploader.upload(path).then((res) => res);

module.export = uploader;
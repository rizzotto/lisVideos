const multer = require('multer')
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require('crypto')
const path = require('path')


/**
 * Storage videos in mongo using GridFS that allows files bigger than 22mb
 */
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + '-' + file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

/**
 * @multer :  middleware that process files uploaded in `multipart/form-data` format.
 */
const upload = multer({
  storage
});



module.exports = upload
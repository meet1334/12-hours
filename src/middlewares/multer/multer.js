const multer = require("multer");
const path = require("path");
const { IMAGE_FILE_TYPES } = require("../../constant/multer.constant");

// const file = {
//   fieldname: "image",
//   originalname: "VISION_LOGO_BLACK.jpg",
//   encoding: "7bit",
//   mimetype: "image/jpeg",
// };

// IMAGE UPLOADING 

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "multer-images",
  filename: (req, file, cb) => {
    if (IMAGE_FILE_TYPES.includes(file.mimetype)) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    }
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

// VIDEO UPLOADING

const videoStorage = multer.diskStorage({
  destination: 'multer-videos', // Destination to store video 
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() 
       + path.extname(file.originalname))
  }
});


const videoUpload = multer({
  storage: videoStorage,
  limits: {
  fileSize: 10000000 // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
       return cb(new Error('Please upload a video'))
    }
    cb(undefined, true)
 }
})

module.exports = { imageUpload ,videoUpload};

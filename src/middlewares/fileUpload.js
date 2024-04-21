const multer = require('multer');
const path = require('path');
const destinationDirectory = path.join(__dirname, '..', 'media');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationDirectory);
  },
  filename: function (req, file, cb) {
    // Specify the file name for the uploaded file
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

module.exports = upload;
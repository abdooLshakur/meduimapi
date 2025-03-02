const multer = require("multer");

const file_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const file_name = Date.now() + "_" + file.originalname;
    cb(null, file_name);
  },
});

const filter_fileType = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jgp" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/avif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    console.log("File Type not Supported");
  }
};

const uploads = multer({ storage: file_storage, fileFilter: filter_fileType });

module.exports = uploads;

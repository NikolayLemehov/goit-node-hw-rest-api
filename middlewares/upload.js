const multer = require('multer');
const path = require('path');
const createError = require("http-errors");

const tempDir = path.join(__dirname, '../', 'tmp');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, tempDir);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter =  (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(createError(400, 'Fail image type'), false);
  }
};

const upload = multer({
  storage, fileFilter,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
});

module.exports = upload;

const multer = require("multer");
const path = require("node:path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const generateCode = () => {
  const digits = "0123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += digits[Math.floor(Math.random() * 10)];
  }

  return code;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const extension = (mimeType) => {
  const mime = ["image/jpeg", "image/png", "image/webp"];
  const sortedExt = ["jpg", "png", "webp"];

  return sortedExt[mime.indexOf(mimeType)];
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const ext = extension(file.mimetype);
    return {
      folder: "assets/upload",
      format: ext,
      public_id: generateCode()
    };
  }
});

/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("assets", "upload"));
  },
  filename: (req, file, cb) => {
    const ext = extension(file.mimetype);
    cb(null, `${generateCode().toString()}.${ext}`);
  },
}); */

const fileFilter = (req, file, cb) => {
  if (extension(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File extension not supported"), false);
  }
};

const mult = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1 * 1000 * 1000,
  },
});

const upload = (fields) => {
  const up = mult.single(fields);
  return (req, res, next) => {
    up(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      } else {
        next();
      }
    });
  };
};

module.exports = upload;

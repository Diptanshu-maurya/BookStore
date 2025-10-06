const multer=require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../backend/public/images')
  },
  filename: function (req, file, cb) {
    const fn = Date.now() + '-' + file.originalname;
    cb(null, fn);
  }
})

const upload = multer({ storage: storage })

module.exports=upload;
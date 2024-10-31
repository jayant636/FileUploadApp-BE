const express = require("express");
const router = express.Router();

const {
  localFileUpload,
  imageUpload,
  videoUpload,
  imagesizereducer,
} = require("../controllers/fileupload");

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imagesizereducer", imagesizereducer);
module.exports = router;

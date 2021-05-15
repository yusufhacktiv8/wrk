const express = require("express");
const UploadController = require("../controllers/uploads.js");
const { isAuthorizedAsIn } = require("../helpers/AuthUtils");

const router = express.Router();

router.post(
  "/",
  isAuthorizedAsIn(["ADMIN", "PROJECT"]),
  UploadController.processFileUpload
);

module.exports = router;

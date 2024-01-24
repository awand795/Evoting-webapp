const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload.controller");
const { authJwt } = require("../middlewares");

let upload = (app) => {

  router.post("/upload", [ authJwt.verifyToken ],uploadController.uploadFiles);
  router.get("/files", uploadController.getListFiles);
  router.get("/files/:name", uploadController.download);

  app.use(router)
};

module.exports = upload;
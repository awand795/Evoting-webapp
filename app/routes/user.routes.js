const { authJwt } = require("../middlewares");
const controller = require('../controllers/user.controller')
const { isAdmin } = require("../middlewares/authJwt");
const controller2 = require('../controllers/auth.controller')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const cpupload = upload.single('file')

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user", [authJwt.verifyToken], controller.getAllUser);

  app.get("/api/user/excel", [authJwt.verifyToken, isAdmin],controller.getExcelFile)

  app.post("/api/user/excel",cpupload,controller.userFromExcel)

  app.get("/api/user/:id", [ authJwt.verifyToken ], controller.getFindUser);

  app.get("/api/status/user/:status", [authJwt.verifyToken ] ,controller.getFindUserByStatus);

  app.post("/api/user", [authJwt.verifyToken, isAdmin], controller2.signup);

  app.put("/api/user/:id", [authJwt.verifyToken], controller.editUser);

  app.delete("/api/user/:id", [authJwt.verifyToken, isAdmin], controller.deleteUser);
};

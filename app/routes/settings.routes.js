const { authJwt } = require("../middlewares");
const controller = require('../controllers/settings.controller')
const { isAdmin } = require("../middlewares/authJwt");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/settings" ,[ authJwt.verifyToken ],controller.getSettingsStatus);

  app.put("/api/settings/:id",[ authJwt.verifyToken ],controller.editSettings);
};

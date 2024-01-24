const { authJwt } = require("../middlewares");
const controller = require('../controllers/vote.controller')
const { isAdmin } = require("../middlewares/authJwt");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/vote",[ authJwt.verifyToken ],controller.getAllVote)
  app.get("/api/vote/excel",[ authJwt.verifyToken ],controller.getExcelFile)
  app.get("/api/vote/:id",[ authJwt.verifyToken ],controller.getVoteByKandidat);

  app.post("/api/vote/",[ authJwt.verifyToken ],controller.createVote);
}

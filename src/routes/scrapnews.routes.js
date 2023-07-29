const Router = require("express");
const newspaperController = require("../controllers/newpaper.controller");
const bvbController = require("../controllers/bvb.controllers");
const mailController = require("../controllers/emailcontrollers");
const router = Router();

router.get("/deportes", newspaperController.getDeportes);
router.get("/actualidad", newspaperController.getPresent);
router.get("/espectaculos", newspaperController.getShows);
router.post("/login", newspaperController.postLogin)
router.get("/bvb/news", bvbController.getBvb);
router.get("/bvb/leaderboard", bvbController.getLeaderboard);
router.get("/bvb/fixture/:fecha?", bvbController.getFixtureBL);
router.get("/bvb/schedule", bvbController.getSchedule);

router.post("/sendmail", mailController.sendMail);


module.exports = router;

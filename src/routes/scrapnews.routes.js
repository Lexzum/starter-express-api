const Router = require("express");
const newpaperController = require("../controllers/newpaper.controller");
const bvbController = require("../controllers/bvb.controllers");
const router = Router();

router.get("/deportes", newpaperController.getDeportes);
router.get("/actualidad", newpaperController.getPresent);
router.get("/espectaculos", newpaperController.getShows);
router.post("/login", newpaperController.postLogin)
router.get("/bvb/news", bvbController.getBvb);
router.get("/bvb/leaderboard", bvbController.getLeaderboard);
router.get("/bvb/fixture/:fecha?", bvbController.getFixtureBL);


module.exports = router;

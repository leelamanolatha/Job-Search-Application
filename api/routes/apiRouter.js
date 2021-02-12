const express = require("express");
const AuthController = require("../controllers/AuthController");
const JobsController = require("../controllers/JobsController");
const SpamController = require("../controllers/SpamController");
const router = express.Router();


router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/jobs", JobsController.getJobs);
router.post("/savejobs", JobsController.saveJobs);
router.post("/checksaved", JobsController.checkSaved);
router.post("/getsaved", JobsController.getSavedJobs);
router.post("/countspam", SpamController.spamCount);

module.exports = router;
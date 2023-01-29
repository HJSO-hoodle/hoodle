const express = require("express");

const router = express.Router();

const api = {
    loginRouter: require("./api/login"),
    normalRouter: require("./api/normal"),
    storyRouter: require("./api/story"),
};

router.use("/hoodle/api", api.loginRouter);
router.use("/hoodle/api/normal", api.normalRouter);
router.use("/hoodle/api/story", api.storyRouter);

module.exports = router;
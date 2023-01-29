const express = require("express");

const router = express.Router();

//story progress
router.get("/progress", async(req, res, next) => {
    let { email } = req.query;
    try {

    } catch(err) {
        res.status(500).send({
            data: "server 500 error",
        });
    }
});

//word check
router.post("/check", async(req, res, next) => {
    let { email, chapter } = req.body;

    try {

    } catch(err) {
        res.status(500).send({
            data: "server 500 error",
        });
    }
});

module.exports = router;
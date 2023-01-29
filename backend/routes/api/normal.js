const express = require("express");
const { sequelize } = require("../../models/index");
const db = require('../../models/index');
const moment = require("moment");

const router = express.Router();

//word select
router.get("/today", async(req, res, next) => {
    try {
        let now = new Date();
        now = moment(now).format('YYYY-MM-DD');

        let checktoday = await db.models.normal_mode.findAll({where: {today: now}})
        
        if(checktoday.length > 0) {
            let todayword = await db.models.normal_mode.findAll({where: {today: now}})
            res.status(200).send({
                data: todayword[0].word,
            });
        } else {
            let todayword = await db.models.normal_mode.findAll({where: {word_num: 6}, order: sequelize.random(), limit: 1})
            await db.models.normal_mode.update({today: now}, { where : {word: todayword[0].word}})
            res.status(200).send({
                data: todayword[0].word,
            });
        }
    } catch(err) {
        res.status(500).send({
            data: "server 500 error",
        });
    }
});

//word check
router.post("/check", async(req, res, next) => {
    let { word } = req.body;

    let now = new Date();
    now = moment(now).format('YYYY-MM-DD');

    try{
        let todayword = await db.models.normal_mode.findAll({where: {today: now}})
        if(word == todayword[0].word) { //정답
            res.status(200).send({
                data: true,
            });
        } else { //틀렸음
            res.status(400).send({
                data: false,
            });
        }
    } catch(err) {
        res.status(500).send({
            data: "server 500 error",
        });
    }
});

module.exports = router;
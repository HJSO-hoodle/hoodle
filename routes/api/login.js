const express = require("express");
const db = require('../../models/index');
const createpw = require("../../encrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../../nodemailer");

const router = express.Router();

router.get("/test", async(req, res, next) => {
    res.status(200).send({
        data: "OK Good"
    });
});

//test 2
router.get("/select", async(req, res, next) => {
    let { email } = req.query;
    try {
        let a = await db.models.user.findAll({ where: {email} })
            .then(result => {
                res.status(200).send({
                    data: result,
                });
            });

        // console.log(a[0].email);
    } catch {
        res.status(500).send({
            data: "server 500 error",
        })
    }
});

//test 3
router.put("/update", async(req, res, next) => {
    let { email, username } = req.body;
    try {
        await db.models.user.update({username}, {where: {email}})
            .then(result => {
                res.status(200).send({
                    data: true,
                })
            })
    } catch(err) {
        res.status(500).send({
            data: "server 500 error",
        });
    }
});

//test 4
router.delete("/delete", async(req, res, next) => {
    let { email } = req.body;
    try {
        await db.models.user.destroy({where: {email}})
            .then(result => {
                res.status(200).send({
                    data: true,
                })
            })
    } catch(err) {
        res.status(500).send({
            data: "server 500 error",
        });
    }
});

//register
router.post("/register", async(req, res, next) => {
    let { email, username, password } = req.body;

    try {
        let check = await db.models.user.findAll({where: {email}});
        password = await createpw(password); //crypto password

        if(check.length > 0) { //now member
            res.status(403).send({
                data: "overlap email",
            });
        } else { //new user
            await db.models.user.create({email, username, password})
            await db.models.user_check.create({email})
            .then(result => {
                res.status(200).send({
                    data: true,
                });
            })
        }
    } catch(err) {
        res.status(500).send({
            data: "server 500 error",
        });
    }
});

//login
//jwt 적용 필요
router.post("/login", async(req, res, next) => {
    let { email, password } = req.body;

    try {
        let checkemail = await db.models.user.findAll({where: {email}})
        if(checkemail.length > 0 ) { //user ok
            password = await createpw(password);
            if(checkemail[0].password == password) { //login ok
                res.status(200).send({
                    data: true,
                });
            } else { //password error
                res.status(401).send({
                    data: "password error",
                });
            }
        } else { //not user
            res.status(403).send({
                data: "email error",
            });
        }
    } catch {
        res.status(500).send({
            data: "server 500 error",
        });
    }
});

//new password
router.post("/password", async(req, res, next) => {
    let { email } = req.body;

    try {
        let new_pass = Math.random().toString(36).slice(2);
        let emailParam = {
            toEmail: email,
            subject: 'Hoodleeeee New Password',
            text: 'New Password: ' + new_pass,
        };

        mailer.sendGmail(emailParam);

        new_pass = await createpw(new_pass);
        await db.models.user.update({password: new_pass}, {where: {email}})
            .then(result => {
                res.status(200).send({
                    data: true,
                });
            })
    } catch(err) {
        res.status(500).send({
            data: "server 500 error",
        });
    }
});

module.exports = router;

// https://jongmin92.github.io/2017/04/08/Node/sequelize/
// https://hyunseob.github.io/2016/03/27/usage-of-sequelize-js/
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
app.set("port", process.env.PORT);

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(express.urlencoded({ extended: false }));

//라우터
const router = require("./routes/index");
app.use("/", router);

//서버
app.listen(app.get("port"), function() {
    console.log(`localhost:${app.get("port")}`);
});

// encrypto -> 비번 암호화 모듈
// nodemailer -> 메일 모듈
// swagger -> 스웨거 모듈
// logger -> 로그 모듈
// jwt auth -> 토큰 검사 모듈
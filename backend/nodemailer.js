const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const senderInfo = require("./config/sender.json");

const mailSender = {
    sendGmail: function (param) {
        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: senderInfo.user,
                pass: senderInfo.pass
            }
        }));

        var mailOptions = {
            from: senderInfo.user,
            to: param.toEmail,
            subject: param.subject,
            text: param.text
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                console.log(error);
            } else {
                console.log('Email sent OK - ' + info.response);
            }
        });
    }
};

module.exports = mailSender;
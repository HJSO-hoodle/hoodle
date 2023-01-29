const crypto = require("crypto");

const createpw = password =>
new Promise((resolve, reject) => {
    crypto.pbkdf2(password, process.env.SECRET_SALT, 130495, 64, 'sha512', function(err, hashed) {
        return err ? reject(err) : resolve(hashed.toString("base64"));
    });
});

module.exports = createpw;

// https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-crypto-%EB%AA%A8%EB%93%88-%EC%95%94%ED%98%B8%ED%99%94
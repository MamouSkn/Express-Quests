// in auth.js to complete hashpassword : 

const argon2 = require("argon2");

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

const hashPassword = (req, res, next) => {
  // hash the password using argon2 then call next()
  argon2
    .hash(req.body.hashedPassword, hashingOptions)
    .then((hashedPassword) => {
    //   console.log(hashedPassword);

      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.hashedPassword)
    .then((isVerified) => {
      if (isVerified) {
        res.send("Credentials are valid");
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


module.exports = {
  hashPassword,
  verifyPassword, // don't forget to export
};
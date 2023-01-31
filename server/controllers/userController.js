const User = require("../modules/userModule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.send({ message: "Please fill-in the correct data" });
  } else {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      res.send({ message: "This user already exists" });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (hash) {
          let newUser = new User({
            username: req.body.username,
            password: hash,
          });
          await newUser.save();
          res.send({ message: "New User Created" });
        } else {
          console.log(err);
          res.send({ message: false });
        }
      });
    }
  }
};

const userLogin = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ id: user._id }, "secret");
        res.send({ token });
      } else {
        res.send({ message: "Incorrect password" });
      }
    });
  } else {
    res.send({ message: "Incorrect username" });
  }
};

const userVerify = async (req, res) => {
  jwt.verify(req.body.token, "secret", async (err, payload) => {
    if (payload) {
      let user = await User.findOne({ _id: payload.id });
      res.send(user);
    } else {
      res.send({ message: "session expired" });
    }
  });
};

module.exports = {
  userSignup,
  userLogin,
  userVerify,
};

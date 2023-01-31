const Advice = require("../modules/adviceModule");

const getAdvice = async (req, res) => {
  let advices = await Advice.find({ userId: req.body.userId });
  res.send(advices);
};
const addAdvice = async (req, res) => {
  let newAdvice = new Advice(
    req.body
    //userId: req.body.userId,
  );
  await newAdvice.save();
  res.send({ newAdvice });
};
const deleteAdvice = async (req, res) => {
  await Advice.findOneAndDelete({ _id: req.params.id });
  res.send({ message: "Advise Deleted" });
};

module.exports = {
  addAdvice,
  getAdvice,
  deleteAdvice,
};

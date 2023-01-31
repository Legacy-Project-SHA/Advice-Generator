const express = require("express");
const app = express();
const port = 3636;
const connection = require("./modules/connection");
const userRoute = require("./routes/userRoute");
const adviceRoute = require("./routes/adviceRoute");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.use("/user", userRoute);
app.use("/advice", adviceRoute);

app.listen(port, () => {
  console.log(`server is connected on port : ${port} `);
});

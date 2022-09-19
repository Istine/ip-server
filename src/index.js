require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const { ip } = require("./routes");

const PORT = process.env.NODE_ENV === "production" ? process.env.PORT : 3000;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(helmet());

app
  .listen(PORT, () => {
    console.log(`server runining of http://localhost:${PORT}`);
  })
  .setTimeout(10000);

app.use("/api/v1", ip);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "works!" });
});

app.use((req, res, next) => {
  next(new Error("no route found!"));
});

app.use(function (error, req, res, next) {
  if (process.env.NODE_ENV === "development") {
    return res.status(400).json({
      message: error.message,
    });
  }
});

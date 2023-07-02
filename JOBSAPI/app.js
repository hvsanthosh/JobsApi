require("dotenv").config();
require("express-async-errors");
// for extra security packages
const halmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();
// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// connectDB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
// middleware's
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to 100 requests per windowMs
  })
);
// to access post route's data
app.use(express.json());
app.use(halmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("jobs api");
});
// routes
// domain/api/v1/auth/register OR domain/api/v1/auth/login
app.use("/api/v1/auth", authRouter);
//domain/api/v1/jobs OR domain/api/v1/jobs/:id
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // console.log("connected to db");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

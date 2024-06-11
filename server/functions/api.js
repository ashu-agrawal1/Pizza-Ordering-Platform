require("dotenv").config();
const express = require("express");
const app = express();
const ServerlessHttp = require("serverless-http");
const cors = require("cors");
const connection = require("../db");
const userRoutes = require("../routes/users");
const authRoutes = require("../routes/auth");
const passwordResetRoutes = require("../routes/passwordReset");
const pizzasRoute = require("../routes/pizzasRoute");
const myoPizzaRoute = require("../routes/myopizza");
const paymentRoute = require("../routes/payment");
//connect database
connection();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

const router = express.Router();
app.use("/.netlify/functions/api", router);

router.get("/", async (req, res) => {
  res.json("hii, welcome");
});

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/password-reset", passwordResetRoutes);
router.use("/pizzas", pizzasRoute);
router.use("/myopizza", myoPizzaRoute);
router.use("/payment", paymentRoute);

router.use("*", (req, res) => {
  return res.sendStatus(404);
});

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};

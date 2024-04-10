const express = require("express");
const userRouter = require("./routes/userRoutes");
const projectRouter = require("./routes/projectRoutes");

const cors = require("cors");
const app = express();

app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// )

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);

module.exports = app;

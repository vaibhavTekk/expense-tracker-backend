const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const expRouter = require("./routes/expRoutes");
const userRouter = require("./routes/userRoutes");
const { connectDB } = require("./utils/db");
const { errorHandler } = require("./middleware/errorMiddleware");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();
app.use("/api/expense", expRouter);
app.use("/api/user", userRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

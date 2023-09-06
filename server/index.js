const express = require("express");
const app = express();
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
require("./config/db");
dotenv.config();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(errorHandler);

app.use("/user", require("./Routes/userRoutes"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

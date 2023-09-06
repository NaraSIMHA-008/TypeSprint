const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect = mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("DataBase Connected");
  })
  .catch((err) => console.log("The error in connecting the database", err));

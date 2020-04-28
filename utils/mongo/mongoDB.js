const mongoose = require("mongoose");
const { MONGODB_URI } = require('../../config')

const connectDB = mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

module.exports = connectDB;

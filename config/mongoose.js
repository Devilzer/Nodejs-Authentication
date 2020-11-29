const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECT_URL,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:Mongo DB'));
db.once('open', ()=> {
    // we're connected!
    console.log("Successfully connected to mongoDB!!");
  });

module.exports = db;

const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

//using routes..
app.use("/",require("./routes/index"));

app.listen(PORT,(err)=>{
    if(err){
        console.log("error in running the server",err);
    }
    console.log("server is up and running on port",PORT);
})
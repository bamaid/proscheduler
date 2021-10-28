const express = require('express');
const app = express();
const routes = require("./routes/scr.routes")

app.use('/scr', routes);

//routes that are not there need to be passed back error messages
app.use((req,res,next)=>{
    const error = new Error("Not Found")
    error.status = 404
    //we pass it to next so it will be processed
    next(error)
});

module.exports = app;
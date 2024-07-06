const express = require("express");

const cors=require("cors");
const app=express();
app.use(cors());
const mainRouter=require("./routes/index");

// Supports JSON body in post requests
app.use(express.json());

app.use("/api/v1",mainRouter);
app.listen(3000);

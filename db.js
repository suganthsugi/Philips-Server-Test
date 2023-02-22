const express = require("express");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL);
con = mongoose.connection;
con.on('open', () => {
    console.log("Database connected...");
});
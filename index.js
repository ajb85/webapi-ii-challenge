const express = require("express");
const server = require("server.js");

server.listen((port = 4000) => {
  console.log(`Listening on port ${port}`);
});

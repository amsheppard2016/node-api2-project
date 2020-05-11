const express = require("express");

const server = express();
const dbRouter = require("./data/dbRouter.js");

server.use(express.json());

server.get("/", (req, res) => {});
server.use("/api/posts", dbRouter);
module.exports = server;

server.get("/", (req, res) => {
    res.send(`<h2>Node Api2 Project</h2>`);
});

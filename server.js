const express = require('express');

const projectRouter = require("./routers/projectRouter");
const actionRouter = require("./routers/actionsRouter");

const server = express();

server.use(express.json());
server.use(logger);

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
    res.json({
        API: "running..."
    });
});

function logger(req, res, next) {
	console.log(`${req.method} ${req.originalUrl} ${new Date().toUTCString()}`);

	next();
}

module.exports = server;
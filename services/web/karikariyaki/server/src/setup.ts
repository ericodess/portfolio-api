import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// Server
const app = express();
const server = createServer(app);

// Socket
const io = new Server(server, {
    cors: {
        origin: process.env.ORIGIN_ADDRESS
            ? process.env.ORIGIN_ADDRESS.split(" ")
            : ["http://localhost:3000"],
    },
});

export { app, server, io };

require("module-alias/register");

import express from "express";

import { app, server } from "./setup";

import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// Setup
dotenv.config();

// Routes
import routes from "@routes";
import { AdminNamespace, ClientNamespace } from "./sockets";

const allowedDomains = process.env.ORIGIN_ADDRESS
    ? process.env.ORIGIN_ADDRESS.split(" ")
    : ["http://localhost:3000"];

// Add-ons
app.use(morgan("dev"));
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true);
            }

            if (allowedDomains.indexOf(origin) === -1) {
                const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;

                return callback(new Error(msg), false);
            }

            return callback(null, true);
        },
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routes);

// Sockets
AdminNamespace.setup();
ClientNamespace.setup();

server.listen(process.env.PORT || 9006);

import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import Connection from "express-mysql-session";
import * as session from "express-session";

// MYSQL
import connection from "./models/connection";

// Models
import {
    ApiKey,
    Banner,
    Concept,
    Course,
    UserGift,
    Gift,
    Podcast,
    Post,
    Product,
    User,
} from "./models";

// Setup
dotenv.config();

AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
});

const IN_PROD = process.env.NODE_ENV === "production";
const TWO_HOURS = 1000 * 60 * 60 * 2;

const COOKIE_NAME = "ed_dashboard";
const COOKIE_PASSWORD = process.env.SECRET ?? "huh";

const app: Express = express();

const MySQLStore = Connection(session);

const sessionsStore = new MySQLStore({
    connectionLimit: 10,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: 3306,
    schema: {
        tableName: "dashboard_session",
    },
    createDatabaseTable: true,
});

const authenticate = async (email: string, password: string) => {
    if (
        email === process.env.ADMIN_USER &&
        password === process.env.ADMIN_PASSWORD
    ) {
        return Promise.resolve({
            email: process.env.ADMIN_USER,
            password: process.env.ADMIN_PASSWORD,
        });
    }

    return null;
};

const admin = new AdminJS({
    rootPath: "/dashboard",
    loginPath: "/dashboard/login",
    logoutPath: "/dashboard/logout",
    branding: {
        companyName: "ericodesu Developer Dashboard",
        withMadeWithLove: false,
    },
    resources: [
        ApiKey,
        Banner,
        Concept,
        Course,
        UserGift,
        Gift,
        Podcast,
        Post,
        Product,
        User,
    ],
});

const adminDashboardRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
        authenticate,
        cookieName: COOKIE_NAME,
        cookiePassword: COOKIE_PASSWORD,
    },
    null,
    {
        store: sessionsStore,
        resave: false,
        saveUninitialized: false,
        secret: COOKIE_PASSWORD,
        cookie: {
            maxAge: TWO_HOURS,
            httpOnly: IN_PROD,
            secure: IN_PROD,
            sameSite: true,
        },
        name: COOKIE_NAME,
    }
);

// Add-ons
app.use(admin.options.rootPath, adminDashboardRouter);
app.use(morgan("dev"));

app.listen(process.env.PORT || 9005);

require('dotenv').config();

import express, { Request, Response } from 'express';
import next from "next";
import morgan from  "morgan";
import cors from "cors";
import cookierParser from "cookie-parser";

//Add-ons
const isDevEnvironment: boolean = process.env.NODE_ENV !== "production";
const app = next({ dev: isDevEnvironment });
const handle = app.getRequestHandler();

const port = process.env.PORT || 9005;

//Cors domains
const allowedDomains: string[] = [`http://localhost:${port}`];

app.prepare()
	.then(() => {
		try{
			const server = express();

			server.use(morgan("dev"));
			server.use(cors({
				origin: (origin, callback) => {
					if(!origin){
						return callback(null, true);
					};
		
					if(allowedDomains.indexOf(origin) === -1){
						const msg: string = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;

						return callback(new Error(msg), false);
					};

					return callback(null, true);
				},
				credentials: true
			}));
			server.use(cookierParser());
			server.use(express.urlencoded({
				extended: true
			}));
			server.use(express.json());

			server.all("*", (req: Request, res: Response) => {
				return handle(req, res);
			});
	  
			server.listen(port, (err?: any) => {
				if(err){
					throw err;
				};
			});
		}catch(e){
			console.error(e);

      		process.exit(1);
		}
	})
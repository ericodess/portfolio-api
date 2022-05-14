import dotenv from 'dotenv';
import express, { Request, Response, Express } from 'express';
import next from 'next';
import morgan from 'morgan';
import cors from 'cors';
import cookierParser from 'cookie-parser';

//Environment config
dotenv.config();

//Environment variables
const port = process.env.PORT || 9005,
	isDevEnvironment: boolean = process.env.NODE_ENV !== 'production',
	allowedDomains: string[] = [`http://localhost:${port}`];

//Add-ons
const app = next({ dev: isDevEnvironment }),
	handle = app.getRequestHandler();

app.prepare().then(() => {
	try {
		const server: Express = express();

		server.use(morgan('dev'));
		server.use(
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
			}),
		);
		server.use(cookierParser());
		server.use(
			express.urlencoded({
				extended: true,
			}),
		);
		server.use(express.json());

		server.all('*', (req: Request, res: Response) => {
			return handle(req, res);
		});

		server.listen(port, (err?: any) => {
			if (err) {
				throw err;
			}
		});
	} catch (e) {
		console.error(e);

		process.exit(1);
	}
});

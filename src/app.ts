import config from './config';
import express, { Request, Response, NextFunction, Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import AppError from './util/appError.util';
import errorHandler from './controller/error.controller';
import studentRouter from './routes/student.route';
import productRouter from './routes/product.route';
import announcementRouter from './routes/announcement.route';

const app: Express = express();

app.use(helmet());


if (config.NODE_ENV == 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//For CORS (Cross origin resource sharing)
app.use(cors({
	origin: '*'
}));

//Data Sanitisation against NoSQL query injection
app.use(ExpressMongoSanitize());

//Data Sanitisation against XSS
app.use(xss());

//Prevent Parameter Pollution
app.use(hpp({
	whitelist: []//Parameters for which we don't wanna restrict duplications
}));


//USED routes
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/announcements', announcementRouter);


//UNUSED ROUTES MIDDLEWARE
app.use('*', (req: Request, res: Response, next: NextFunction) => {
	next(new AppError(`can't find the ${req.originalUrl} on this server`, 404));
})

//GLOBAL ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

export default app;

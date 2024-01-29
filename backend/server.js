//**************** imports ****************//
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDatabase from './config/configDatabase.js';
import Template from "./template.js";
import {errorsHandlerMiddleware} from './middlewares/errorsHandlerMiddleware.js';
import {errorMiddlewareHandler} from './middlewares/errorMiddleware.js';
import {handleNotFound} from './controllers/authController.js';

import authRoutes from './routes/authRoutes.js';
import ErrorHandler from './utils/errorHandler.js';

//**************** configuration setup ****************//
dotenv.config({path: 'backend/config/config.env'});
colors.enable();

//**************** variables ****************//
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
const API_URL = process.env.API_ENV || "/api/v1.0/";

//**************** connect to database ****************//
connectDatabase();
//**************** middlewares ****************//
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//**************** app listening ****************//
const server = app.listen(PORT, () => {
    console.log(`The server is listening at - http://127.0.0.1:${PORT}${API_URL} in ${NODE_ENV} mode🔥`.yellow);
});

//**************** routes****************//
app.get('/api/v1.0/', (req, res) => {
    res.send(Template());
});

app.use('/api/v1.0/auth', authRoutes);
if (process.env.NODE_ENV === 'PRODUCTION') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
    })
}
//**************** handle errors middleware ****************//
/*app.use(errorsHandlerMiddleware);*/
app.use(errorMiddlewareHandler);

/*app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false, statusCode, message,
    });
});*/

//**************** handling unhandled promise rejection ****************//
/*
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection!');
    server.close(() => {
        process.exit(1);
    });
});*/
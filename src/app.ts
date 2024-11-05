/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import path from 'path'; // Import path to help set the views directory
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure the correct path to the views folder

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this to handle form submissions

// CORS configuration
// app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(cors({ origin: 'https://pet-buddy-frntend.vercel.app', credentials: true }));
app.use(cookieParser());

// Application routes
app.use('/api', router);

// Basic route for API
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Apollo Gears API Service',
  });
});

// Global error handler
app.use(globalErrorHandler);

// Not found handler
app.use(notFound);

export default app;

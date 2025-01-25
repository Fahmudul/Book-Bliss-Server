import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import router from './app/Routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

app.use('/api/v1', router);
// app.get('/test', async (req, res) => {
//   res.send('test route');
// });

app.use(globalErrorHandler);

export const App = app;

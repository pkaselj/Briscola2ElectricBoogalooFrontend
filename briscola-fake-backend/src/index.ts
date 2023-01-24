import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { loginAction } from './routes/login-route';

dotenv.config();

const app : Express = express();
const port = process.env.PORT;

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/api/login', (req, res) => {
  res.send('Success')
});

app.post('/api/login', loginAction);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
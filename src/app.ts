import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoute } from './app/modules/users/user.routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', UserRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Next level assignment 2 ready to go!');
});

export default app;

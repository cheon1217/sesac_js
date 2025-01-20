import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import { getRandomQuote } from './quote';

const app: Application = express();
const PORT:number = 3000;

app.use(morgan('dev'));
app.use(express.static('public'));

app.get("/api/quote", (req: Request, res: Response): void => {
    res.json({ quote: getRandomQuote() });
});

app.listen(PORT, (): void => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
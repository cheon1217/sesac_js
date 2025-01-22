// npm install express
// npm install --save-dev @types/express || npm install -D @types/express

import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";

const app: Application = express();
const PORT: number = 3000;

app.use(morgan("dev"));

app.get("/", (req: Request, res: Response): void => {
    res.send("Hello World");
});

app.get("/error", (req: Request, res: Response): void => {
    throw new Error("에러 발생!");
});

// 404 핸들용 미들웨어
app.use((req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
        success: false,
        message: "Page Not Found"
    });
});

// 에러 처리용 미들웨어
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(`[에러]: ${err.message}`);
    res.status(500).json({
        success: false,
        message: err.message
    });
});

app.listen(PORT, (): void => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import userRoutes from "./routes/userRoutes";

const app: Application = express();
const PORT: number = 3000;

// 각종 미들웨어
app.use(express.json());
app.use(morgan('dev'));

// 사용자 라우트 등록
app.use("/users", userRoutes);

// 404 에러 처리 미들웨어
app.use((req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({ error: "Page not found" });
});

// 여러가지 에러 처리 미들웨어
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    res.status(400).json({ error: err.message });
});

// 서버 실행
app.listen(PORT, (): void => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
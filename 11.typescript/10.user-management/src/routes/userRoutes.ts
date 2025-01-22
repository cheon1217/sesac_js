import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from "../controllers/userController";

const router = Router();

// CRUD 추가..

router.get("/", (req: Request, res: Response): void => {
    const users = UserController.listUsers();
    res.json(users);
});

router.post("/", (req: Request, res: Response): void => {
    const { name, email } = req.body;
    const newUser = UserController.addUser(name, email);
    res.status(201).json(newUser);
});

router.delete("/:id", (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);
    UserController.deleteUser(id);
    res.status(204).send();
});

export default router;
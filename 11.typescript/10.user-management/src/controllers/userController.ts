import { User, users } from "../user";

export class UserController {
    static listUsers(): User[] {
        return users;
    }

    static addUser(name: string, email: string): User {
        const newUser: User = { id: Date.now(), name, email };
        users.push(newUser);
        return newUser;
    }

    static deleteUser(id: number): void {
        const index = users.findIndex((user) => user.id === id);
        if (index === -1) {
            throw new Error(`User with ID ${id} not found`);
        }
        users.splice(index, 1);
    }
}
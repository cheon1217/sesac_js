// 직접 구현
// const todo: {
//     id: number, title: string, completed: boolean
// }[] = [];

// interface로 구현
import { Todo } from "./todo";

const todo: Todo[] = [];
let currentId: number = 1;

function addTodo(title: string): void {
    const newTodo = { id: currentId++, title, completed: false}; // 객체 구조 설정
    todo.push(newTodo);
    console.log("Todo added: ", newTodo);
}

addTodo("Learn TypeScript");
addTodo("Learn React");
addTodo("잠자기");

console.log("Todos: ", todo);

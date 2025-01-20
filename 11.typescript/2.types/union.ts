let id: number | string;

id = 123; // 숫자
console.log(`아이디: ${id}`);

id = "ABC"; // 문자열
console.log(`아이디: ${id}`);

// literal type
let direction: "left" | "right" | "up" | "down";

direction = "left"; 
// direction = "LEFT"; // strict라 대문자 안됨
// direction = "stop";
console.log(`Direction: ${direction}`);
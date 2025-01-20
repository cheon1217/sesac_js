// CommonJS 스타일, ESModule 스타일
import { add, sub, mul, div } from "./math";
import { toUpperCase, toLowerCase } from "./string";

console.log(`Add: ${add(10, 5)}`);
console.log(`Sub: ${sub(10, 5)}`);
console.log(`Mul: ${mul(10, 5)}`);
console.log(`Div: ${div(10, 5)}`);

console.log(`ToUpperCase: ${toUpperCase("hello")}`);
console.log(`ToLowerCase: ${toLowerCase("HELLO")}`);
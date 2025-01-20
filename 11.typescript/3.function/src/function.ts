function add(a: number, b: number): number {
  return a + b;
}

const sum: number = add(10, 20);
console.log(`sum: ${sum}`);

function logMessage(message: string): void {
  console.log(`Message: ${message}`);
}

logMessage('Hello TypeScript!');
enum Direction {
    Up, // 0
    Down, // 1
    Left, // 2
    Right // 3
}

let move: Direction = Direction.Up;
console.log(`이동하는 방향은? ${Direction[move]}`);
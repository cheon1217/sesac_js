var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right"; // 3
})(Direction || (Direction = {}));
var move = Direction.Up;
console.log("\uC774\uB3D9\uD558\uB294 \uBC29\uD5A5\uC740? ".concat(Direction[move]));
